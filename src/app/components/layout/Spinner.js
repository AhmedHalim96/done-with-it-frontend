import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Backdrop from "./Backdrop";

const Spinner = ({ loading, backdrop }) => {
	return (
		loading && (
			<>
				{backdrop && <Backdrop className="backdrop-light" />}
				<div className="spinner">
					<ClipLoader color={"crimson"} loading={loading} size={60} />
				</div>
			</>
		)
	);
};

export default Spinner;
