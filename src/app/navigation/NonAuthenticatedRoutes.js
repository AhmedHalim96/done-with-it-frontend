import React from "react";
import { Route, Switch } from "react-router-dom";
import ListingsPage from "../pages/ListingsPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import WelcomePage from "../pages/WelcomePage";
import routes from "./routes";

const NonAuthenticatedRoutes = () => {
	return (
		<Switch>
			<Route path={routes.LOGIN}>
				<LoginPage />
			</Route>
			<Route path={routes.REGISTER}>
				<RegisterPage />
			</Route>
			<Route path={routes.FEED}>
				<ListingsPage />
			</Route>
			<Route path={routes.WELCOME}>
				<WelcomePage />
			</Route>
			<Route path="/">
				<WelcomePage />
			</Route>
		</Switch>
	);
};

export default NonAuthenticatedRoutes;
