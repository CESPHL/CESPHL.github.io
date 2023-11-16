import React from 'react';

const Modal = ({ show, handleClose, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      {show && (
        <section className="modal-main">
          {children}
          <button onClick={handleClose}>Close</button>
        </section>
      )}
    </div>
  );
};

export default Modal;
