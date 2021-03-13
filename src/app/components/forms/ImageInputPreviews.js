import React from "react";
import settings from "../../config/settings";

const ImageInputPreviews = ({ photos, removePhoto, ...otherProps }) => {
	return (
		<div className="form__imagePreviewsWrapper">
			{photos.map((photo, i) => (
				<div className="form__imagePreview" key={i}>
					<img
						src={
							photo.url
								? settings.baseUrl + photo.url
								: URL.createObjectURL(photo)
						}
						className="form__imagePreviewImg"
						alt={photo.url}
					/>
					<div
						className="form__imagePreviewDelete"
						onClick={() => removePhoto(photo)}
						title="Remove"
					>
						<i className="fa fa-trash"></i>
					</div>
				</div>
			))}

			<label className="form__imageLabel" title="Add a picture" {...otherProps}>
				<i className="fa fa-camera"></i>
			</label>
		</div>
	);
};

export default ImageInputPreviews;
