import React from "react";

const ImageInputPreviews = ({ photos, removePhoto, ...otherProps }) => {
	return (
		<div className="form__imagePreviewsWrapper">
			{photos.map(photo => (
				<div className="form__imagePreview">
					<img
						src={URL.createObjectURL(photo)}
						className="form__imagePreviewImg"
						alt={photo.name}
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
