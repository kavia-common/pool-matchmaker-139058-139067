import React, { useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { useData } from '../data/DataContext';

/**
 * PUBLIC_INTERFACE
 * ProfileView
 * Display and edit basic user preferences (mock only).
 */
export default function ProfileView() {
  const { theme, toggleTheme } = useTheme();
  const { state } = useData();
  const [distance, setDistance] = useState(10);
  const [format, setFormat] = useState('8-ball');

  return (
    <div className="container">
      <div className="h1" style={{ marginBottom: 8 }}>Profile</div>
      <div className="text-muted" style={{ marginBottom: 16 }}>Customize your pool matchmaking preferences.</div>

      <div className="card" style={{ padding: 18 }}>
        <div className="row" style={{ gap: 16 }}>
          <div className="avatar" style={{ width: 72, height: 72, fontSize: 22 }}>{state.currentUser.name.slice(0,1)}</div>
          <div className="col">
            <div className="h2">{state.currentUser.name}</div>
            <div className="text-muted">{state.currentUser.rank} • {state.currentUser.location}</div>
          </div>
        </div>
        <div className="col" style={{ marginTop: 16 }}>
          <label className="text-muted" htmlFor="distance">Search distance (km)</label>
          <input id="distance" className="input" type="number" min="1" max="100" value={distance} onChange={(e) => setDistance(Number(e.target.value))} />
          <label className="text-muted" htmlFor="format">Preferred format</label>
          <select id="format" className="select" value={format} onChange={(e) => setFormat(e.target.value)}>
            <option>8-ball</option>
            <option>9-ball</option>
            <option>Cutthroat</option>
          </select>
          <div className="row" style={{ justifyContent: 'space-between', marginTop: 6 }}>
            <button className="btn">Save (mock)</button>
            <button className="btn" onClick={toggleTheme}>
              Toggle Theme ({theme})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
