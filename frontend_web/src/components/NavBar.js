import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

/**
 * PUBLIC_INTERFACE
 * NavBar
 * Bottom navigation with 4 tabs and theme toggle.
 */
export default function NavBar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <NavItem to="/matches" label="Matches" icon="💫" />
      <NavItem to="/challenges" label="Challenges" icon="🎱" />
      <NavItem to="/messages" label="Messages" icon="💬" />
      <NavItem to="/profile" label="Profile" icon="👤" />
      <ThemeToggle inline />
    </nav>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      aria-label={label}
    >
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ fontSize: 18 }}>{icon}</div>
        <div style={{ fontSize: 12 }}>{label}</div>
        <div className="nav-indicator" />
      </div>
    </NavLink>
  );
}
