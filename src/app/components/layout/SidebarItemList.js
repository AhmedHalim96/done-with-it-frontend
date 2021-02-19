import React, { useContext } from "react";
import AuthenticationContext from "../../auth/context";
import SidebarItem from "./SidebarItem";

const SidebarItemList = ({ className = "" }) => {
	const { isAuthenticated, setAuthenticated } = useContext(
		AuthenticationContext
	);
	return (
		<ul className={"sidebar__itemList " + className}>
			<SidebarItem to="/" title="Home" />

			{!isAuthenticated && <SidebarItem to="/login" title="Login" />}
			{!isAuthenticated && <SidebarItem to="/register" title="Register" />}

			{isAuthenticated && (
				<SidebarItem to="/createListing" title="Create Listing" />
			)}
		</ul>
	);
};

export default SidebarItemList;
