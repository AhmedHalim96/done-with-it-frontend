import React from "react";

const Card = ({ title, subtitle, details, image }) => {
	return (
		<div className="card">
			{image && <img src={image} alt={title} className="card__image" />}
			<div className="card__body">
				<h2 className="card__title">{title}</h2>
				{subtitle && <p className="card__subtitle">{subtitle}</p>}
				{details && <div className="card__text">{details}</div>}
			</div>
		</div>
	);
};

export default Card;
