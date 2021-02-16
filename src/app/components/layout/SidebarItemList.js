import React from "react";
import SidebarItem from "./SidebarItem";

const SidebarItemList = () => {
	return (
		<ul className="sidebar__itemList">
			<SidebarItem to="/" title="Home" />
			<SidebarItem to="/login" title="Login" />
			<SidebarItem to="/register" title="Register" />
			<SidebarItem to="/createListing" title="Create Listing" />
		</ul>
	);
};

export default SidebarItemList;
