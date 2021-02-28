import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateListingPage from "../pages/CreateListingPage";
import EditListingPage from "../pages/EditListingPage";
import ListingDetailsPage from "../pages/ListingDetailsPage";
import ListingsPage from "../pages/ListingsPage";

import routes from "./routes";

const AuthenticatedRoutes = () => {
	return (
		<Switch>
			<Route path={routes.CREATE_LISTING}>
				<CreateListingPage />
			</Route>

			<Route path={routes.LISTING_DETAILES}>
				<ListingDetailsPage />
			</Route>

			<Route path={routes.EDIT_DETAILES}>
				<EditListingPage />
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
