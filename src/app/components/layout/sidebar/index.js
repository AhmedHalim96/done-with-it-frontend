import React, { useContext } from "react";
import LayoutContext from "../../../layout/context";
import Backdrop from "../Backdrop";
import SidebarItemList from "./SidebarItemList";

const Sidebar = ({ state, close }) => {
	const { isSidebarOpen, closeSidebar } = useContext(LayoutContext);
	return (
		isSidebarOpen && (
			<>
				<Backdrop close={closeSidebar} />
				<div className="sidebar">
					<i className="fa fa-times sidebar__close" onClick={closeSidebar}></i>
					<SidebarItemList className="u-mt-4" />
				</div>
			</>
		)
	);
};

export default Sidebar;
