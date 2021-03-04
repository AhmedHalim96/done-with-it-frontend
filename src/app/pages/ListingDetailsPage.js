import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import listingsApi from "../api/listings";
import settings from "../config/settings";

const ListingDetailsPage = () => {
	const listingId = useParams().listingId;
	const [listing, setListing] = useState(null);

	const getListing = async () => {
		const res = await listingsApi.getListingDetails(listingId);
		if (!res.ok) {
			return console.log(res.data);
		}

		setListing({
			...res.data,
			user: {
				id: 2,
				name: "Ahmed Halim",
				avatar: "http://192.168.1.111:8000/storage/listings/jacket-photo.jpg",
				listing: 12,
			},
		});
	};

	useEffect(() => {
		getListing();
	}, []);

	return (
		listing && (
			<div className="listingDetails">
				<div className="listingDetails__top">
					<h2 className="listingDetails__title">{listing.title} </h2>
					<span className="listingDetails__price">{listing.price}$</span>
					<span
						className="button button-primary button-outline listingDetails__addToCart"
						title="Add To Cart"
					>
						<i className="fa fa-shopping-cart"></i> +
					</span>
					<Link
						to={"/update/" + listing.id}
						className="button button-secondary button-outline"
						title="Add To Cart"
					>
						<i className="fa fa-pencil"></i> Edit
					</Link>
				</div>
				<p className="listingDetails__category">
					Category:{" "}
					<Link
						to={"/categories/" + listing.category.id}
						className="link link-secondary"
					>
						{listing.category.title}
					</Link>
				</p>
				<p className="listingDetails__seller u-mb-2">
					by{" "}
					<Link to="#!" className="link link-primary">
						{listing.user.name}
					</Link>
				</p>
				{/* Will be replaced by a carosell */}
				<img
					src={settings.baseUrl + listing.photo}
					alt={listing.title}
					className="listingDetails__photo"
				/>
				<p className="listingDetails__description">{listing.description}</p>
			</div>
		)
	);
};

export default ListingDetailsPage;
