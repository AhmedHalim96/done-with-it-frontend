import React, { useState } from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const ImageInput = ({ name, url = [], ...otherProps }) => {
	const [previews, setPreviews] = useState([]); // either a photo url is given  or null
	const {
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
	} = useFormikContext();
	return (
		<div className="form__group">
			{previews && (
				<div
					className={`form__imagePreviewsWrapper ${
						touched[name] && errors[name] ? "" : "u-mb-2"
					}`}
				>
					{previews.map(preview => (
						<div className="form__imagePreview">
							<img
								src={preview}
								className="form__imagePreviewImg"
								alt={preview}
							/>
							<div
								className="form__imagePreviewDelete"
								onClick={() =>
									setPreviews(previews.filter(current => preview !== current))
								}
								title="Remove"
							>
								<i className="fa fa-trash"></i>
							</div>
						</div>
					))}

					<label
						className="form__imageLabel"
						htmlFor={name}
						title="Add a picture"
					>
						<i className="fa fa-camera"></i>
					</label>
				</div>
			)}
			<input
				className={`form__image`}
				id={name}
				name={name}
				type="file"
				onChange={e => {
					const files = e.target.files;
					const previewsList = [];
					for (let i = 0; i < files.length; i++) {
						const file = files[i];
						previewsList.push(URL.createObjectURL(file));
					}
					setPreviews([...previews, ...previewsList]);
					setFieldTouched(name, true);
					setFieldValue(name, files);
				}}
				{...otherProps}
			/>
			<ErrorMessage visible={touched[name]} error={errors[name]} />
		</div>
	);
};

export default ImageInput;
