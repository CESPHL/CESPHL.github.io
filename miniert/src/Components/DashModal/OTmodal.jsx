import React from 'react';
import './OTmodal.css';

const Modal = ({ show, handleClose, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        <button className="close-btn" onClick={handleClose}> Close</button>
        <button>Save</button>
      </section>
    </div>
  );
};

export default Modal;
