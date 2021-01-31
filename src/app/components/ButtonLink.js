import React from "react";

const ButtonLink = ({ className = "buttonLink-primary", icon, title, to }) => {
	return (
		<a className={`buttonLink ${className}`} href={to}>
			{icon && <span className="buttonLink__icon">{icon}</span>}
			<span className="buttonLink__title">{title}</span>
		</a>
	);
};

export default ButtonLink;
