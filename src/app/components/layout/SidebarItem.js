import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ to, title }) => {
	return (
		<li className="sidebar__item">
			<Link to={to} className="sidebar__link">
				{title}
			</Link>
		</li>
	);
};

export default SidebarItem;
