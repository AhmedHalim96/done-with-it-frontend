import React from "react";
import { Field, useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const FormField = ({ name, type, label, className }) => {
	const { errors, touched } = useFormikContext();
	return (
		<div className="form__group">
			<label className="form__label" htmlFor={name}>
				{label}:
			</label>
			<Field
				className={`form__input ${className}`}
				name={name}
				type={type}
				id={name}
				placeholder={label}
			/>
			<ErrorMessage visible={touched[name]} error={errors[name]} />
		</div>
	);
};

export default FormField;
