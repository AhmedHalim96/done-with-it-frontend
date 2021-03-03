import React, { useState } from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const ImageInput = ({ name, url = null, ...otherProps }) => {
	const [preview, setPreview] = useState(url); // either a photo url is given  or null
	const {
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
	} = useFormikContext();
	return (
		<div className="form__group">
			<div
				className={`form__imagePreviewWrapper ${
					touched[name] && errors[name] ? "" : "u-mb-2"
				}`}
			>
				{preview && (
					<div
						style={{ backgroundImage: `url(${preview})` }}
						className="form__imagePreview"
					/>
				)}
				<label className="form__imageLabel" htmlFor={name}>
					<i className="fa fa-camera"></i>
				</label>
			</div>
			<input
				className={`form__image`}
				id={name}
				name={name}
				type="file"
				onChange={e => {
					const photo = e.target.files[0];
					setPreview(URL.createObjectURL(photo));
					setFieldTouched(name, true);
					setFieldValue(name, photo);
				}}
				{...otherProps}
			/>
			<ErrorMessage visible={touched[name]} error={errors[name]} />
		</div>
	);
};

export default ImageInput;
