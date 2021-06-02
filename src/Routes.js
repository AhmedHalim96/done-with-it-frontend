import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import routes from "./app/navigation/routes";
import AuthContext from "./app/auth/context";

import CreateListingPage from "./app/pages/CreateListingPage";
import EditListingPage from "./app/pages/EditListingPage";
import ListingDetailsPage from "./app/pages/ListingDetailsPage";
import ListingsPage from "./app/pages/ListingsPage";
import LoginPage from "./app/pages/LoginPage";
import RegisterPage from "./app/pages/RegisterPage";
import WelcomePage from "./app/pages/WelcomePage";

const AuthenticatedRoutes = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<Switch>
			{isAuthenticated ? (
				<Route path={routes.CREATE_LISTING}>
					<CreateListingPage />
				</Route>
			) : null}

			{isAuthenticated ? (
				<Route path={routes.EDIT_LISTING}>
					<EditListingPage />
				</Route>
			) : null}

			{!isAuthenticated ? (
				<Route path={routes.LOGIN}>
					<LoginPage />
				</Route>
			) : null}

			{!isAuthenticated ? (
				<Route path={routes.REGISTER}>
					<RegisterPage />
				</Route>
			) : null}

			{!isAuthenticated ? (
				<Route path={routes.WELCOME}>
					<WelcomePage />
				</Route>
			) : null}

			<Route path={routes.LISTING_DETAILS}>
				<ListingDetailsPage />
			</Route>

			<Route path={routes.FEED}>
				<ListingsPage />
			</Route>
			<Route>
				<ListingsPage />
			</Route>
		</Switch>
	);
};

export default AuthenticatedRoutes;
