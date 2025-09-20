import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import SwipeView from './pages/SwipeView';
import MatchesView from './pages/MatchesView';
import ChallengesView from './pages/ChallengesView';
import MessagesView from './pages/MessagesView';
import ProfileView from './pages/ProfileView';
import { ThemeProvider } from './theme/ThemeContext';
import { DataProvider } from './data/DataContext';
import { ModalHost } from './components/ModalHost';

// PUBLIC_INTERFACE
function AppShell() {
  /** Root application shell with navigation, routes, and modal host. */
  const location = useLocation();
  const hideNavOn = useMemo(() => [], []);
  const showNav = !hideNavOn.includes(location.pathname);

  return (
    <div className="app-root">
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/swipe" replace />} />
          <Route path="/swipe" element={<SwipeView />} />
          <Route path="/matches" element={<MatchesView />} />
          <Route path="/challenges" element={<ChallengesView />} />
          <Route path="/messages" element={<MessagesView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="*" element={<Navigate to="/swipe" replace />} />
        </Routes>
      </main>
      {showNav && <NavBar />}
      <ModalHost />
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Top-level App that wires providers and the router. */
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider initialTheme={theme} onThemeChange={setTheme}>
      <DataProvider>
        <Router>
          <AppShell />
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}
