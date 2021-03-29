import React from "react";
import Backdrop from "./layout/Backdrop";

function LightBox({ current, next, previous, close }) {
	return (
		<>
			<Backdrop close={close} />
			<div className="lightBox">
				<i className="fa fa-times lightBox__close" onClick={close}></i>
				<img src={current} alt={current} className="lightBox__image" />
			</div>
		</>
	);
}

export default LightBox;
