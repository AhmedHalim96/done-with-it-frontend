import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import listingsApi from "../api/listings";

const ListingsPage = () => {
	const [listings, setListings] = useState([]);

	const getListings = async () => {
		const res = await listingsApi.getListings();
		if (!res.ok) {
			return console.log(res.data);
		}

		setListings(res.data);
	};

	useEffect(() => {
		getListings();
	}, []);

	return (
		<div className="listings">
			<div className="listings__feed">
				{listings.map(listing => (
					<Link to={"/listings/" + listing.id} key={listing.id}>
						<Card
							image={listing.photo}
							title={listing.title}
							subtitle={listing.price + "$"}
							details={listing.description.substr(0, 80) + "..."}
						/>{" "}
					</Link>
				))}
			</div>
		</div>
	);
};

export default ListingsPage;
