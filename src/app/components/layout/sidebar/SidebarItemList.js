import React, { useContext } from "react";
import AuthenticationContext from "../../../auth/context";
import routes from "../../../navigation/routes";
import SidebarItem from "./SidebarItem";
import SidebarUser from "./SidebarUser";

const SidebarItemList = ({ className = "" }) => {
	const { isAuthenticated } = useContext(AuthenticationContext);

	return (
		<ul className={"sidebar__itemList " + className}>
			{isAuthenticated && <SidebarUser />}
			<SidebarItem to="/" title="Home" />
			{!isAuthenticated && <SidebarItem to={routes.LOGIN} title="Login" />}
			{!isAuthenticated && (
				<SidebarItem to={routes.REGISTER} title="Register" />
			)}
			{isAuthenticated && (
				<SidebarItem to={routes.CREATE_LISTING} title="Create Listing" />
			)}
		</ul>
	);
};

export default SidebarItemList;
