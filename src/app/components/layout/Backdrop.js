import React, { useContext, useEffect } from "react";
import LayoutContext from "../../layout/context";

const Backdrop = ({ close }) => {
	const { setScrolling } = useContext(LayoutContext);

	useEffect(() => {
		// disable scrolling when backdrop is mounted
		setScrolling(false);
	}, []);

	// re-enable scrolling when backdrop is unmounted
	useEffect(() => () => setScrolling(true), []);

	const handleClose = () => {
		setScrolling(true);
		close();
	};
	return <div className="backdrop" onClick={handleClose} />;
};

export default Backdrop;
