import React from "react";

import settings from "../config/settings";

const Navbar = () => {
	return (
		<div className="navbar">
			<a href="/" className="navbar__logo">
				<img
					src={`${settings.assetsUrl}/logo-white.png`}
					alt="Done with it"
					className="navbar__logoImage"
				/>
				<h2 className="navbar__logoText">Done with it</h2>
			</a>
			<div className="navbar__search">
				<input
					type="text"
					placeholder="Search for anything"
					className="form__input navbar__searchInput"
				/>
			</div>
			<i className="fa fa-bars navbar__sidebarToggle"></i>
		</div>
	);
};

export default Navbar;
