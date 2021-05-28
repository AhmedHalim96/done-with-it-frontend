import React, { useState } from "react";

import "./app/styles/App.scss";

import Navbar from "./app/components/layout/Navbar";
import Sidebar from "./app/components/layout/sidebar";
import AuthenticatedRoutes from "./app/navigation/AuthenticatedRoutes";
import NonAuthenticatedRoutes from "./app/navigation/NonAuthenticatedRoutes";
import LayoutContext from "./app/layout/context";
import AuthContext from "./app/auth/context";
import AuthStorage from "./app/auth/storage";

const App = () => {
	const [sidebarState, setSidebarState] = useState(false);
	const [scrolling, setScrolling] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	React.useEffect(() => {
		const fetchedUser = AuthStorage.getUser();
		if (!fetchedUser) return;
		setUser(fetchedUser);
		setAuthenticated(true);
	}, []);

	return (
		<div className={`app ${!scrolling ? "u-no-scrolling" : ""}`}>
			<LayoutContext.Provider
				value={{
					isSidebarOpen: sidebarState,
					openSidebar: () => setSidebarState(true),
					closeSidebar: () => setSidebarState(false),
					scrolling,
					setScrolling,
				}}
			>
				<AuthContext.Provider
					value={{
						isAuthenticated: authenticated,
						setAuthenticated,
						user,
						setUser,
					}}
				>
					<Navbar />
					<Sidebar />
					<main className="u-pt-2">
						{authenticated ? (
							<AuthenticatedRoutes />
						) : (
							<NonAuthenticatedRoutes />
						)}
					</main>
				</AuthContext.Provider>
			</LayoutContext.Provider>
		</div>
	);
};

export default App;
