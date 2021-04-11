import React from "react";

function Alert({ message }) {
	return (
		<>
			<div className="u-pt-1" />
			<div className="alert">
				<p className="alert_message">{message}</p>
			</div>
		</>
	);
}

export default Alert;
