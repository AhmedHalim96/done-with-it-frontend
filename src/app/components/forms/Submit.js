import React from "react";
import { useFormikContext } from "formik";

const Submit = ({ title, className }) => {
	const { handleSubmit } = useFormikContext();
	return (
		<span
			className={`button button-primary form__submit ${className}`}
			onClick={handleSubmit}
		>
			{title}
		</span>
	);
};

export default Submit;
