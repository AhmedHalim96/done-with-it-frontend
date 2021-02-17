import React, { useState } from "react";
import { Switch } from "react-router-dom";

import "./app/styles/App.scss";

import Navbar from "./app/components/layout/Navbar";
import Sidebar from "./app/components/layout/Sidebar";
import AuthenticatedRoutes from "./app/navigation/AuthenticatedRoutes";
import NonAuthenticatedRoutes from "./app/navigation/NonAuthenticatedRoutes";

const App = () => {
	const [sidebarState, setSidebarState] = useState(false);
	const [authenticated, setAuthenticated] = useState(true);

	return (
		<div className="app">
			<Navbar openSidebar={() => setSidebarState(true)} />
			<Sidebar state={sidebarState} close={() => setSidebarState(false)} />
			<Switch>
				{authenticated ? <AuthenticatedRoutes /> : <NonAuthenticatedRoutes />}
			</Switch>
		</div>
	);
};

export default App;
