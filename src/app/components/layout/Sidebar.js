import React from "react";
import Branding from "../Branding";
import Backdrop from "./Backdrop";
import SidebarItemList from "./SidebarItemList";

const Sidebar = ({ state, close }) => {
	return (
		state && (
			<>
				<Backdrop close={close} />
				<div className="sidebar">
					<SidebarItemList />
				</div>
			</>
		)
	);
};

export default Sidebar;
