# Pool Matchmaker – Frontend Web (Cosmic Energy)

A modern, lightweight React app for pool challenge matchmaking. Users can swipe nearby players, match, chat, and set up one-on-one challenges.

- Theme: Cosmic Energy (Indigo & Pink fusion)
- Style: Modern, minimal, smooth transitions, rounded corners, subtle shadows, gradients
- Layout: Bottom navigation (Matches, Challenges, Messages, Profile), Swipe interface, Modal dialogs for challenges/messaging

## Run

- npm start – start dev server at http://localhost:3000
- npm test – run tests (CI-friendly, non-watch)
- npm run build – production build

## Structure

- src/theme/ThemeContext.js – light/dark mode and CSS variables integration
- src/data/DataContext.js – mocked state (candidates, matches, challenges, messages)
- src/components/NavBar.js – bottom tab navigation with theme toggle
- src/components/ModalHost.js – global modal host/context
- src/pages/SwipeView.js – Tinder-like swipe experience
- src/pages/MatchesView.js – matched users with quick actions
- src/pages/ChallengesView.js – challenge list and status updates
- src/pages/MessagesView.js – threads and chat UI
- src/pages/ProfileView.js – user details and preferences
- src/pages/modals/ChallengeModal.js – create challenge
- src/pages/modals/MessageModal.js – quick message compose

All backend actions are mocked/stubbed via DataContext.

## Notes

- No external UI framework; pure React + CSS
- Routing via react-router-dom v6
- Accessibility: proper roles/labels for nav and modals
