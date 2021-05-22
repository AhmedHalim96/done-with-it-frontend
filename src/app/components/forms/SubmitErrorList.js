import React from "react";

const SubmitErrorList = ({
	error,
	errorMessage,
	errors = ["error 1", "error 2", "error 3"],
}) => {
	if (!error) return null;

	return (
		<div className="form__submitErrorsContainer">
			<h3 className="form__submitErrorsHeader">{errorMessage}</h3>
			{errors && (
				<ul className="form__submitErrorsList">
					{errors.map((error, index) => (
						<li key={index} className="form__submitErrorsItem">
							- {error}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SubmitErrorList;
