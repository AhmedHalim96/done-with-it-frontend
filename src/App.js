import React, { useState } from "react";

import "./app/styles/App.scss";

import Navbar from "./app/components/layout/Navbar";
import Sidebar from "./app/components/layout/Sidebar";
import AuthenticatedRoutes from "./app/navigation/AuthenticatedRoutes";
import NonAuthenticatedRoutes from "./app/navigation/NonAuthenticatedRoutes";
import LayoutContext from "./app/layout/context";
import AuthContext from "./app/auth/context";

const App = () => {
	const [sidebarState, setSidebarState] = useState(false);
	const [authenticated, setAuthenticated] = useState(true);

	return (
		<div className="app">
			<LayoutContext.Provider
				value={{
					isSidebarOpen: sidebarState,
					openSidebar: () => setSidebarState(true),
					closeSidebar: () => setSidebarState(false),
				}}
			>
				<AuthContext.Provider
					value={{
						isAuthenticated: authenticated,
						setAuthenticated,
					}}
				>
					<Navbar />
					<Sidebar />
					{authenticated ? <AuthenticatedRoutes /> : <NonAuthenticatedRoutes />}
				</AuthContext.Provider>
			</LayoutContext.Provider>
		</div>
	);
};

export default App;
