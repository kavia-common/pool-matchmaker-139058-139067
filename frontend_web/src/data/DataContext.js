import React, { createContext, useContext, useMemo, useReducer } from 'react';

const initialState = {
  currentUser: {
    id: 'me',
    name: 'You',
    rank: 'Intermediate',
    location: 'Downtown',
    bio: 'Up for friendly 8-ball, most evenings.',
  },
  candidates: [
    { id: 'u1', name: 'Alex', rank: 'Advanced', distance: 2, bio: 'Break master. Let’s play 9-ball.', availability: 'Tonight 7-9pm' },
    { id: 'u2', name: 'Sam', rank: 'Beginner', distance: 5, bio: 'Learning! Be gentle 😂', availability: 'Sat afternoon' },
    { id: 'u3', name: 'Jordan', rank: 'Intermediate', distance: 3, bio: 'Bar league regular.', availability: 'Thu 6-8pm' },
  ],
  matches: [],
  challenges: [
    { id: 'c1', withUser: 'Alex', type: '8-ball', status: 'pending', when: 'Fri 7:00 PM', where: 'Corner Pocket' },
  ],
  messages: {
    // threadId: [{sender,text,at}]
  },
};

const DataContext = createContext({
  state: initialState,
  dispatch: () => {},
});

// Reducer actions
function reducer(state, action) {
  switch (action.type) {
    case 'SWIPE_LIKE': {
      const candidate = state.candidates.find(c => c.id === action.id);
      const remaining = state.candidates.filter(c => c.id !== action.id);
      const matched = candidate ? [...state.matches, candidate] : state.matches;
      return { ...state, candidates: remaining, matches: matched };
    }
    case 'SWIPE_PASS': {
      const remaining = state.candidates.filter(c => c.id !== action.id);
      return { ...state, candidates: remaining };
    }
    case 'CREATE_CHALLENGE': {
      const challenge = {
        id: `c_${Date.now()}`,
        withUser: action.withUser,
        type: action.payload.type,
        when: action.payload.when,
        where: action.payload.where,
        status: 'pending',
      };
      return { ...state, challenges: [challenge, ...state.challenges] };
    }
    case 'UPDATE_CHALLENGE_STATUS': {
      return {
        ...state,
        challenges: state.challenges.map(c => c.id === action.id ? { ...c, status: action.status } : c),
      };
    }
    case 'SEND_MESSAGE': {
      const { threadId, sender, text } = action;
      const list = state.messages[threadId] || [];
      const msg = { sender, text, at: new Date().toISOString() };
      return { ...state, messages: { ...state.messages, [threadId]: [...list, msg] } };
    }
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * DataProvider
 * Provides mocked data and state reducer for the app.
 */
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useData
 * Hook to access app data state and dispatcher.
 */
export function useData() {
  return useContext(DataContext);
}
