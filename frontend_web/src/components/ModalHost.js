import React, { createContext, useContext, useMemo, useState } from 'react';

const ModalContext = createContext({
  // PUBLIC_INTERFACE
  openModal: (_node) => {},
  // PUBLIC_INTERFACE
  closeModal: () => {},
});

export function useModal() {
  return useContext(ModalContext);
}

/**
 * PUBLIC_INTERFACE
 * ModalHost
 * Provides a portal-like modal host using React tree (no external deps).
 */
export function ModalHost() {
  const [content, setContent] = useState(null);
  const [open, setOpen] = useState(false);

  const openModal = (node) => {
    setContent(node);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setContent(null), 220);
  };

  const value = useMemo(() => ({ openModal, closeModal }), []);

  return (
    <ModalContext.Provider value={value}>
      <div className={`modal-root ${open ? 'active' : ''}`} aria-hidden={!open}>
        <div
          className={`modal-backdrop ${open ? 'visible' : ''}`}
          onClick={closeModal}
          aria-label="Close modal backdrop"
          role="button"
          tabIndex={0}
        />
        <div className={`modal-panel ${open ? 'visible' : ''}`} role="dialog" aria-modal="true">
          {content}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export default ModalHost;
