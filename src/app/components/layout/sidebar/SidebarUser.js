import React from "react";

import AuthContext from "../../../auth/context";
import AuthStorage from "../../../auth/storage";
import DropDownMenu from "../DropdownMenu";

const SidebarUser = () => {
	const { user, setAuthenticated } = React.useContext(AuthContext);

	const _logout = () => {
		AuthStorage.removeUser();
		setAuthenticated(false);
	};
	return (
		<DropDownMenu
			className="sidebar__user"
			header={
				<>
					<i className="fa fa-user"></i> {user.name}
				</>
			}
			items={[
				"PLACEHOLDER",
				"PLACEHOLDER",
				<span
					className="button button-outline button-primary"
					onClick={_logout}
				>
					<i className="fa fa-sign-out-alt"></i> Logout
				</span>,
			]}
		/>
	);
};

export default SidebarUser;

// entities
// down
//  right
