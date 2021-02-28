import React, { useState, useEffect } from "react";

import "./app/styles/App.scss";

import categoriesApi from "./app/api/categories";

import Navbar from "./app/components/layout/Navbar";
import Sidebar from "./app/components/layout/Sidebar";
import AuthenticatedRoutes from "./app/navigation/AuthenticatedRoutes";
import NonAuthenticatedRoutes from "./app/navigation/NonAuthenticatedRoutes";
import LayoutContext from "./app/layout/context";
import AuthContext from "./app/auth/context";

const App = () => {
	const [sidebarState, setSidebarState] = useState(false);
	const [authenticated, setAuthenticated] = useState(true);

	const getCategories = async () => {
		const res = await categoriesApi.getCategories();
		console.log(res.data);
	};
	useEffect(() => {
		getCategories();
	}, []);

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
