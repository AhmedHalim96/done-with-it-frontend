import React from "react";

import Branding from "../components/Branding";
import ButtonLink from "../components/ButtonLink";

import settings from "../config/settings";

const WelcomePage = () => {
	return (
		<div
			className="welcome"
			style={{
				backgroundImage: "url(" + settings.assetsUrl + "/welcome_bg.jpg)",
			}}
		>
			<div className="welcome__centerBox">
				<Branding />
				<ButtonLink
					className="buttonLink-primary buttonLink-block"
					title="Log in"
					to="/login"
				/>
				<ButtonLink
					className="buttonLink-secondary buttonLink-block"
					title="register"
					to="/register"
				/>
			</div>
		</div>
	);
};

export default WelcomePage;
