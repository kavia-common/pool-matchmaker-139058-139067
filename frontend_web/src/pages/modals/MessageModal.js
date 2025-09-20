import React, { useState } from 'react';
import { useData } from '../../data/DataContext';

/**
 * PUBLIC_INTERFACE
 * MessageModal
 * Send a quick message to a user (mock only).
 */
export default function MessageModal({ user, onClose }) {
  const { dispatch } = useData();
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    dispatch({ type: 'SEND_MESSAGE', threadId: user.id, sender: 'me', text });
    onClose();
  };

  return (
    <>
      <div className="modal-header">
        <div className="h2">Message {user.name}</div>
        <button className="btn btn-ghost" onClick={onClose} aria-label="Close">✖</button>
      </div>
      <div className="modal-body">
        <textarea
          className="textarea"
          rows={5}
          placeholder="Say hello and propose a time..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={send}>Send</button>
      </div>
    </>
  );
}
