import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Masonry } from "masonic";

import Card from "../components/Card";
import listingsApi from "../api/listings";
import settings from "../config/settings";
import useApi from "../hooks/useApi";
import Spinner from "../components/layout/Spinner";
import Alert from "../components/Alert";

const ListingsPage = () => {
	const {
		data: listings,
		error,
		errorMessage,
		loading,
		request: getListings,
	} = useApi(listingsApi.getListings);

	useEffect(() => {
		getListings();
	}, []);

	return (
		<>
			{loading && <Spinner loading={loading} />}
			{error && <Alert message={errorMessage} />}
			{listings && (
				<div className="listings">
					<h1 className="listings__header">Discover our latest listings!</h1>
					<div className="listings__feedWrapper">
						{" "}
						<Masonry
							items={listings}
							className="listings__feed"
							columnWidth={450}
							columnGutter={10}
							render={({ i, data: listing, width }) => (
								<Link
									to={"/listings/" + listing.id}
									key={listing.id}
									className="listings__feedItem u-mb-1"
								>
									<Card
										image={settings.baseUrl + listing.photos[0].url}
										title={listing.title}
										subtitle={listing.price + "$"}
										details={
											listing.description
												? listing.description.substr(0, 80) + "..."
												: null
										}
									/>
								</Link>
							)}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default ListingsPage;
