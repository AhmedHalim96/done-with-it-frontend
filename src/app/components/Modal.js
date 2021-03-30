import React from "react";
import Backdrop from "./layout/Backdrop";

function Modal({ children, confirm = false, close }) {
	return (
		<>
			<Backdrop close={close} className="backdrop-light" />
			<div className="modal">
				<i className="fa fa-times modal__close" onClick={close}></i>
				<div className="modal__body">{children}stalk much?</div>

				<div className="modal__footer">
					{!confirm && (
						<span className="button button-primary" onClick={close}>
							ok
						</span>
					)}

					{confirm && (
						<span className="button button-success" onClick={confirm}>
							yes
						</span>
					)}

					{confirm && (
						<span className="button button-danger" onClick={close}>
							No
						</span>
					)}
				</div>
			</div>
		</>
	);
}

export default Modal;
