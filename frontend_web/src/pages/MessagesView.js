import React, { useMemo, useState } from 'react';
import { useData } from '../data/DataContext';

/**
 * PUBLIC_INTERFACE
 * MessagesView
 * Show message threads and let user chat.
 */
export default function MessagesView() {
  const { state, dispatch } = useData();

  const threads = useMemo(() => {
    // create threads for all matches
    return state.matches.map((m) => ({
      id: m.id,
      name: m.name,
      preview: (state.messages[m.id] || [])[0]?.text || 'Start a conversation...',
      messages: state.messages[m.id] || [],
    }));
  }, [state.matches, state.messages]);

  const [activeId, setActiveId] = useState(threads[0]?.id || null);
  const activeThread = threads.find((t) => t.id === activeId);

  const [text, setText] = useState('');

  const send = () => {
    if (!activeId || !text.trim()) return;
    dispatch({ type: 'SEND_MESSAGE', threadId: activeId, sender: 'me', text });
    setText('');
  };

  return (
    <div className="container">
      <div className="h1" style={{ marginBottom: 8 }}>Messages</div>
      <div className="text-muted" style={{ marginBottom: 16 }}>Chat with your matches.</div>

      {threads.length === 0 ? (
        <div className="card" style={{ padding: 20 }}>
          No conversations yet. Match with players to start chatting.
        </div>
      ) : (
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div className="card" style={{ flex: '0 0 280px' }}>
            <div className="col" style={{ padding: 12 }}>
              {threads.map((t) => (
                <button
                  key={t.id}
                  className="list-item"
                  onClick={() => setActiveId(t.id)}
                  style={{ width: '100%', textAlign: 'left', background: activeId === t.id ? 'rgba(79,70,229,.06)' : '' }}
                >
                  <div className="avatar">{t.name.slice(0,1)}</div>
                  <div className="col">
                    <strong>{t.name}</strong>
                    <span className="text-muted" style={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{t.preview}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="card" style={{ flex: 1, minHeight: 360 }}>
            <div className="col" style={{ padding: 12, height: 400 }}>
              <div className="row" style={{ justifyContent: 'space-between', padding: '8px 6px' }}>
                <div className="h2">{activeThread?.name || 'Select a thread'}</div>
              </div>
              <div className="col chat" style={{ flex: 1, overflowY: 'auto' }}>
                {activeThread?.messages.map((m, idx) => (
                  <div className={`bubble ${m.sender === 'me' ? 'me' : 'them'}`} key={idx}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="row" style={{ paddingTop: 8 }}>
                <input
                  className="input"
                  placeholder="Type a message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' ? send() : undefined}
                />
                <button className="btn btn-primary" onClick={send}>Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
