import React, { useEffect, useState } from "react";
import LightBox from "./LightBox";

const ImageSlider = ({ images }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isLightBoxVisible, setIsShowLightBoxVisible] = useState(false);

	const isFirst = currentImageIndex <= 0;
	const isLast = currentImageIndex >= images.length - 1;

	const next = () => setCurrentImageIndex(currentImageIndex + 1);
	const previous = () => setCurrentImageIndex(currentImageIndex - 1);

	const showLightBox = () => setIsShowLightBoxVisible(true);
	const hideLightBox = () => setIsShowLightBoxVisible(false);

	// const slideShow = () => {
	// 	if (isLast) {
	// 		console.log("object");
	// 		setCurrentImageIndex(0);
	// 	} else {
	// 		next();
	// 	}
	// };

	useEffect(() => {
		// setInterval(slideShow, 5000);
	}, []);

	return (
		<div className="imageSlider">
			{isLightBoxVisible && (
				<LightBox current={images[currentImageIndex]} close={hideLightBox} />
			)}
			<div className="imageSlider__overlay" />
			{!isFirst && (
				<span className="imageSlider__previous" onClick={previous}>
					<span className="imageSlider__previousArrow" onClick={previous} />
				</span>
			)}
			<div className="imageSlider__imageWrapper">
				{images.map((imageUrl, i) => (
					<img
						src={imageUrl}
						alt={imageUrl}
						key={i}
						className={`imageSlider__image ${
							i === currentImageIndex ? "imageSlider__image-selected" : ""
						}`}
						onClick={showLightBox}
					/>
				))}
			</div>
			{!isLast && (
				<span className="imageSlider__next" onClick={next}>
					<span className="imageSlider__nextArrow" onClick={next} />
				</span>
			)}
			<ul className="imageSlider__navList">
				{images.map((_, i) => (
					<li
						key={i}
						className={`imageSlider__navItem ${
							i === currentImageIndex ? "imageSlider__navItem-selected" : ""
						}`}
						onClick={() => setCurrentImageIndex(i)}
					/>
				))}
			</ul>
		</div>
	);
};

export default ImageSlider;
