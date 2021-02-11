import React from "react";
import { Field, useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const FormField = ({
	block,
	className = "",
	label,
	name,
	suffix,
	type,
	...otherProps
}) => {
	const { errors, touched } = useFormikContext();
	return (
		<div className="form__group">
			<label className="form__label" htmlFor={name}>
				{label}:
			</label>
			<Field
				className={`form__input  
					${touched[name] && errors[name] ? "form__input-danger" : "u-mb-2"}  
					${block && "form__input-block"}
					${className}`}
				id={name}
				name={name}
				type={type}
				placeholder={label}
				{...otherProps}
			/>
			<span className="form__inputSuffix">{suffix}</span>
			{}
			<ErrorMessage visible={touched[name]} error={errors[name]} />
		</div>
	);
};

export default FormField;
