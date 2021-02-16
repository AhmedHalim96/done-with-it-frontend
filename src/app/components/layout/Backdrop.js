import React from "react";

const Backdrop = ({ close, children }) => {
	return <div className="backdrop" onClick={close} />;
};

export default Backdrop;
