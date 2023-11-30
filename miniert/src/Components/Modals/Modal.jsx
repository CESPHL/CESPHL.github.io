import React from 'react';
import './modal.css';

const Modal = ({ show, handleClose, children, handleSave }) => {
	const showHideClassName = show ? "modal display-block" : "modal display-none";

	return (
		<div className={showHideClassName}>
			<section className="modal-main">
				{children}

				<div className="buttons-container">
					<button className="close-btn" onClick={handleClose}> Close</button>
					<button className="save-btn" onClick={handleSave}>Save</button>
				</div>
			</section>
		</div>
	);
};

export default Modal;
