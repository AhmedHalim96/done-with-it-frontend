import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LayoutContext from "../../../layout/context";

const SidebarItem = ({ to, title }) => {
	const { closeSidebar } = useContext(LayoutContext);
	return (
		<li className="sidebar__item">
			<Link to={to} className="sidebar__link" onClick={closeSidebar}>
				{title}
			</Link>
		</li>
	);
};

export default SidebarItem;
