import React from "react";
import settings from "../config/settings";

const Branding = () => {
	return (
		<div className="branding">
			<img
				src={`${settings.assetsUrl}/logo-red.png`}
				alt="Done with it"
				className="branding__logo"
			/>
			<h2 className="branding__text">Done With it!</h2>
			<p className="branding__slogan paragraph">
				A place to sell what you don't want anymore!
			</p>
		</div>
	);
};

export default Branding;
