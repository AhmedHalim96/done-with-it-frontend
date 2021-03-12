import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import listingsApi from "../api/listings";
import settings from "../config/settings";
import useApi from "../hooks/useApi";

const ListingsPage = () => {
	const { data: listings, error, loading, request: getListings } = useApi(
		listingsApi.getListings
	);

	useEffect(() => {
		getListings();
	}, []);

	return (
		listings && (
			<div className="listings">
				<div className="listings__feed">
					{listings.map(listing => (
						<Link to={"/listings/" + listing.id} key={listing.id}>
							<Card
								image={settings.baseUrl + listing.photos[0].url}
								title={listing.title}
								subtitle={listing.price + "$"}
								details={
									listing.description
										? listing.description.substr(0, 80) + "..."
										: null
								}
							/>{" "}
						</Link>
					))}
				</div>
			</div>
		)
	);
};

export default ListingsPage;
