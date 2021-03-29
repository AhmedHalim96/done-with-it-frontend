import React, { useContext, useEffect } from "react";
import LayoutContext from "../../layout/context";

const Backdrop = ({ close }) => {
	const { setScrolling } = useContext(LayoutContext);
	useEffect(() => {
		setScrolling(false);
	}, []);

	useEffect(() => () => setScrolling(true), []);
	return (
		<div
			className="backdrop"
			onClick={() => {
				setScrolling(true);
				close();
			}}
		/>
	);
};

export default Backdrop;
