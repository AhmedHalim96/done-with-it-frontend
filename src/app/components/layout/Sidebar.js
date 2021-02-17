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
					<i className="fa fa-times sidebar__close" onClick={close}></i>
					<SidebarItemList className="u-mt-4" />
				</div>
			</>
		)
	);
};

export default Sidebar;
