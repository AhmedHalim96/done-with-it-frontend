import { Field, useFormikContext } from "formik";
import React from "react";

import ErrorMessage from "./ErrorMessage";

const FormSelect = ({ items, name, label, className = "", ...otherProps }) => {
	const { errors, touched } = useFormikContext();

	return (
		<div className="form__group u-mb-2">
			<label className="form__label" htmlFor={name}>
				{label}:
			</label>
			<div
				className={`form__selectWrapper 
        ${touched[name] && errors[name] ? "" : "u-mb-2"}
      `}
			>
				<Field
					as="select"
					name={name}
					id={name}
					className={`form__input 
          form__select   
					${touched[name] && errors[name] ? "form__input-danger" : ""}  
					${className}`}
					{...otherProps}
				>
					<option value="">Choose a category</option>
					{items.map((item, index) => (
						<option key={index} value={item.id}>
							{item.title}
						</option>
					))}
				</Field>
			</div>
			<ErrorMessage visible={touched[name]} error={errors[name]} />
		</div>
	);
};

export default FormSelect;
