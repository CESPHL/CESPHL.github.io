import React from 'react';
import './changePassModal.css';

const ChangePassModal = ({ show, handleClose, children, handleSave }) => {
  const showHideClassName = show ? "change-pass-modal change-pass-modal-display-block" : "change-pass-modal change-pass-modal-display-none";

  return (
    <div className={showHideClassName}>
      <section className="change-pass-modal-main">
        {children}

        <div className="change-pass-modal-buttons-container">
          <button className="change-pass-modal-close-btn" onClick={handleClose}>Close</button>
          <button className="change-pass-modal-save-btn" onClick={handleClose}>Yes, Save</button>
        </div>
      </section>
    </div>
  );
};

export default ChangePassModal;