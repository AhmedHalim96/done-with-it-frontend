import React, { useState } from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import ImageInputPreviews from "./ImageInputPreviews";

const ImageInput = ({ name, ...otherProps }) => {
	const {
		errors,
		touched,
		values,
		setFieldValue,
		setFieldTouched,
	} = useFormikContext();

	const photos = values[name];
	const removeImage = selectedPhoto => {
		setFieldValue(
			name,
			photos.filter(photo => photo !== selectedPhoto)
		);
	};

	console.log(errors[name]);
	return (
		<div
			className={`form__group ${touched[name] && errors[name] ? "" : "u-mb-2"}`}
		>
			<ImageInputPreviews
				photos={photos}
				removePhoto={removeImage}
				htmlFor={name}
			/>
			<input
				className="form__image"
				id={name}
				name={name}
				type="file"
				onChange={e => {
					const files = e.target.files;
					setFieldTouched(name, true);
					setFieldValue(name, [...photos, ...files]);
				}}
				{...otherProps}
			/>
			<ErrorMessage visible={touched[name]} error={errors[name]} />
		</div>
	);
};

export default ImageInput;
