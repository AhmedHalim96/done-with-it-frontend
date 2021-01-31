import React from "react";

const ErrorMessage = ({ error, visible }) => {
	if (!visible) return null;
	return <p className="form__errorMessage">* {error}</p>;
};

export default ErrorMessage;
