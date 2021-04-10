import React, { useContext, useEffect } from "react";
import LayoutContext from "../../layout/context";

const Backdrop = ({ close, className = "" }) => {
	const { setScrolling } = useContext(LayoutContext);

	useEffect(() => {
		// disable scrolling when backdrop is mounted
		setScrolling(false);
	}, []);

	// re-enable scrolling when backdrop is unmounted
	useEffect(() => () => setScrolling(true), []);

	const handleClose = () => {
		if (close) close();
	};
	return <div className={"backdrop " + className} onClick={handleClose} />;
};

export default Backdrop;
