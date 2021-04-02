import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading }) => {
	return (
		<div className="spinner">
			<ClipLoader color={"crimson"} loading={loading} size={60} />
		</div>
	);
};

export default Spinner;
