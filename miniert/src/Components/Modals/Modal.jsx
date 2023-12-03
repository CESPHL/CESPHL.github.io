import React from 'react';
import './modal.css';

const Modal = ({ show, handleClose, children, handleSave }) => {
	const showHideClassName = show ? "modal display-block" : "modal display-none";

	return (
		<div className={showHideClassName}>
			<section className="modal-content">
				{children}
			</section>
		</div>
	);
};

export default Modal;
