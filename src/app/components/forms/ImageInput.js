import React from "react";
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
	const removedPhotos = values["removedPhotos"];

	const removePhoto = removedPhoto => {
		setFieldValue(
			name,
			photos.filter(photo => photo !== removedPhoto)
		);

		// add removedPhotos id to a removed photos list to be deleted from the server
		if (removedPhoto.url) {
			setFieldValue("removedPhotos", [...removedPhotos, removedPhoto.id]);
		}
	};

	return (
		<div
			className={`form__group ${touched[name] && errors[name] ? "" : "u-mb-2"}`}
		>
			<ImageInputPreviews
				photos={photos}
				removePhoto={removePhoto}
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
