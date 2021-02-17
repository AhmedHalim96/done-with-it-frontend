import React from "react";
import { Link } from "react-router-dom";

import settings from "../../config/settings";

const Navbar = ({ openSidebar }) => {
	return (
		<div className="navbar">
			<Link to="/" className="navbar__logo">
				<img
					src={`${settings.assetsUrl}/logo-white.png`}
					alt="Done with it"
					className="navbar__logoImage"
				/>
				<h2 className="navbar__logoText">Done with it</h2>
			</Link>
			<div className="navbar__search">
				<input
					type="text"
					placeholder="Search for anything"
					className="form__input navbar__searchInput"
				/>
			</div>
			<i className="fa fa-bars navbar__sidebarToggle" onClick={openSidebar}></i>
		</div>
	);
};

export default Navbar;
