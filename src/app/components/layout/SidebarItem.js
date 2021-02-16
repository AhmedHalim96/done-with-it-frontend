import React from "react";

const SidebarItem = ({ to, title }) => {
	return (
		<li className="sidebar__item">
			<a href={to} className="sidebar__link">
				{title}
			</a>
		</li>
	);
};

export default SidebarItem;
