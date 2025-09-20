import React from 'react';
import { useData } from '../data/DataContext';

/**
 * PUBLIC_INTERFACE
 * ChallengesView
 * Manage your pool challenges.
 */
export default function ChallengesView() {
  const { state, dispatch } = useData();

  const accept = (id) => dispatch({ type: 'UPDATE_CHALLENGE_STATUS', id, status: 'accepted' });
  const decline = (id) => dispatch({ type: 'UPDATE_CHALLENGE_STATUS', id, status: 'declined' });

  return (
    <div className="container">
      <div className="h1" style={{ marginBottom: 8 }}>Challenges</div>
      <div className="text-muted" style={{ marginBottom: 16 }}>Review and manage challenges.</div>
      <div className="list">
        {state.challenges.length === 0 && (
          <div className="card" style={{ padding: 20 }}>
            No challenges yet.
          </div>
        )}
        {state.challenges.map((c) => (
          <div className="list-item" key={c.id}>
            <div className="avatar">{c.withUser.slice(0,1)}</div>
            <div className="col">
              <strong>{c.withUser}</strong>
              <span className="text-muted">{c.type} • {c.when} • {c.where}</span>
              <span className="chip" style={{ width: 'fit-content' }}>
                {c.status}
              </span>
            </div>
            <div className="row">
              {c.status === 'pending' && (
                <>
                  <button className="btn" onClick={() => accept(c.id)}>Accept</button>
                  <button className="btn btn-ghost" onClick={() => decline(c.id)}>Decline</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
