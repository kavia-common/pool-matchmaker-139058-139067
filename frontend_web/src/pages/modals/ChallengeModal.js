import React, { useState } from 'react';
import { useData } from '../../data/DataContext';

/**
 * PUBLIC_INTERFACE
 * ChallengeModal
 * Create a new challenge with a user (mock only).
 */
export default function ChallengeModal({ user, onClose }) {
  const { dispatch } = useData();
  const [type, setType] = useState('8-ball');
  const [when, setWhen] = useState('');
  const [where, setWhere] = useState('');

  const submit = () => {
    dispatch({ type: 'CREATE_CHALLENGE', withUser: user.name, payload: { type, when, where } });
    onClose();
  };

  return (
    <>
      <div className="modal-header">
        <div className="h2">Challenge {user.name}</div>
        <button className="btn btn-ghost" onClick={onClose} aria-label="Close">✖</button>
      </div>
      <div className="modal-body">
        <label className="text-muted" htmlFor="ctype">Game type</label>
        <select id="ctype" className="select" value={type} onChange={(e) => setType(e.target.value)}>
          <option>8-ball</option>
          <option>9-ball</option>
          <option>Cutthroat</option>
        </select>

        <label className="text-muted" htmlFor="cwhen">When</label>
        <input id="cwhen" className="input" placeholder="e.g. Fri 7:00 PM" value={when} onChange={(e) => setWhen(e.target.value)} />

        <label className="text-muted" htmlFor="cwhere">Where</label>
        <input id="cwhere" className="input" placeholder="e.g. Corner Pocket" value={where} onChange={(e) => setWhere(e.target.value)} />
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={submit}>Send Challenge</button>
      </div>
    </>
  );
}
