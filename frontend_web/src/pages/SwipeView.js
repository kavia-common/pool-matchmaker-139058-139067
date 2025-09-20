import React, { useMemo, useRef, useState } from 'react';
import { useData } from '../data/DataContext';
import { useModal } from '../components/ModalHost';
import ChallengeModal from './modals/ChallengeModal';
import MessageModal from './modals/MessageModal';

/**
 * PUBLIC_INTERFACE
 * SwipeView
 * Primary experience: swipe through nearby players.
 */
export default function SwipeView() {
  const { state, dispatch } = useData();
  const { openModal, closeModal } = useModal();

  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const startRef = useRef({ x: 0, y: 0 });

  const topCandidate = state.candidates[0];
  const nextCandidate = state.candidates[1];

  const handlePointerDown = (e) => {
    const p = 'touches' in e ? e.touches[0] : e;
    startRef.current = { x: p.clientX, y: p.clientY };
    setDrag({ x: 0, y: 0, active: true });
  };

  const handlePointerMove = (e) => {
    if (!drag.active) return;
    const p = 'touches' in e ? e.touches[0] : e;
    const dx = p.clientX - startRef.current.x;
    const dy = p.clientY - startRef.current.y;
    setDrag((d) => ({ ...d, x: dx, y: dy }));
  };

  const commitSwipe = (direction) => {
    if (!topCandidate) return;
    if (direction === 'right') {
      dispatch({ type: 'SWIPE_LIKE', id: topCandidate.id });
    } else {
      dispatch({ type: 'SWIPE_PASS', id: topCandidate.id });
    }
    setDrag({ x: 0, y: 0, active: false });
  };

  const handlePointerUp = () => {
    if (!drag.active) return;
    const threshold = 120;
    if (drag.x > threshold) {
      commitSwipe('right');
    } else if (drag.x < -threshold) {
      commitSwipe('left');
    } else {
      setDrag({ x: 0, y: 0, active: false });
    }
  };

  const styleTop = useMemo(() => {
    const rot = drag.x / 22;
    const scale = drag.active ? 1.02 : 1;
    const opacity = drag.active ? 0.96 : 1;
    const tX = drag.x;
    const tY = drag.y;
    return {
      transform: `translate(${tX}px, ${tY}px) rotate(${rot}deg) scale(${scale})`,
      opacity,
      zIndex: 2,
    };
  }, [drag]);

  const styleNext = {
    transform: 'scale(.98) translateY(8px)',
    opacity: 0.85,
    zIndex: 1,
  };

  const openChallenge = (user) => {
    openModal(<ChallengeModal user={user} onClose={closeModal} />);
  };
  const openMessage = (user) => {
    openModal(<MessageModal user={user} onClose={closeModal} />);
  };

  return (
    <div className="container">
      <div className="col">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="h1">Find players nearby</div>
          <div className="chip">Cosmic Energy 🎱</div>
        </div>

        <div className="swipe-stack">
          {nextCandidate && (
            <SwipeCard
              data={nextCandidate}
              style={styleNext}
              muted
              onChallenge={() => openChallenge(nextCandidate)}
              onMessage={() => openMessage(nextCandidate)}
            />
          )}
          {topCandidate ? (
            <SwipeCard
              data={topCandidate}
              style={styleTop}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onChallenge={() => openChallenge(topCandidate)}
              onMessage={() => openMessage(topCandidate)}
              onLike={() => commitSwipe('right')}
              onPass={() => commitSwipe('left')}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}

function SwipeCard({
  data,
  style,
  muted = false,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onChallenge,
  onMessage,
  onLike,
  onPass,
}) {
  return (
    <div
      className="swipe-card card"
      style={style}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
      role="article"
      aria-label={`Profile card for ${data.name}`}
    >
      <div className="media">{/* Placeholder avatar art */}<span>🎱</span></div>
      <div className="content">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="h2">{data.name}</div>
          <div className="chip">{data.rank}</div>
        </div>
        <div className="text-muted">~ {data.distance} km away</div>
        <div>{data.bio}</div>
        <div className="text-muted">Availability: {data.availability}</div>

        <div className="swipe-actions">
          <button className="btn btn-danger" onClick={onPass} aria-label="Pass">✖</button>
          <button className="btn btn-primary" onClick={onLike} aria-label="Like">❤</button>
          <button className="btn" onClick={onMessage} aria-label="Message">💬</button>
          <button className="btn" onClick={onChallenge} aria-label="Challenge">⚡</button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card center" style={{ height: '60vh' }}>
      <div className="col center">
        <div className="h2">You’re all caught up</div>
        <div className="text-muted">Check back soon for more players to challenge.</div>
      </div>
    </div>
  );
}
