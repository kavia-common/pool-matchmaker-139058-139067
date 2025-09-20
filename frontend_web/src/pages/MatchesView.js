import React from 'react';
import { useData } from '../data/DataContext';
import { useModal } from '../components/ModalHost';
import ChallengeModal from './modals/ChallengeModal';
import MessageModal from './modals/MessageModal';

/**
 * PUBLIC_INTERFACE
 * MatchesView
 * Displays your matched users.
 */
export default function MatchesView() {
  const { state } = useData();
  const { openModal, closeModal } = useModal();

  const openChallenge = (user) => openModal(<ChallengeModal user={user} onClose={closeModal} />);
  const openMessage = (user) => openModal(<MessageModal user={user} onClose={closeModal} />);

  return (
    <div className="container">
      <div className="h1" style={{ marginBottom: 8 }}>Your Matches</div>
      <div className="text-muted" style={{ marginBottom: 16 }}>Connect, chat, and set up that game.</div>
      <div className="list">
        {state.matches.length === 0 && (
          <div className="card" style={{ padding: 20 }}>
            No matches yet. Try swiping on the Swipe tab.
          </div>
        )}
        {state.matches.map((m) => (
          <div className="list-item" key={m.id}>
            <div className="avatar">{m.name.slice(0,1)}</div>
            <div className="col">
              <strong>{m.name}</strong>
              <span className="text-muted">{m.rank} • ~{m.distance} km away</span>
            </div>
            <div className="row">
              <button className="btn" onClick={() => openMessage(m)}>💬</button>
              <button className="btn btn-primary" onClick={() => openChallenge(m)}>Challenge</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
