import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ className = "buttonLink-primary", icon, title, to }) => {
	return (
		<Link className={`buttonLink ${className}`} to={to}>
			{icon && <span className="buttonLink__icon">{icon}</span>}
			<span className="buttonLink__title">{title}</span>
		</Link>
	);
};

export default ButtonLink;
