import React from "react";

const listing = {
	id: 7,
	title: "Couch",
	description:
		" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta libero vitae magni, saepe deleniti non voluptate quaerat veniam? Fuga ipsam incidunt deleniti doloremque quis hic est in doloribus officia?",
	price: 100,
	photo: "http://192.168.1.111:8000/storage/listings/couch-photo.jpg",
	user: {
		id: 2,
		name: "Ahmed Halim",
		avatar: "http://192.168.1.111:8000/storage/listings/jacket-photo.jpg",
		listing: 12,
	},
};

const ListingDetailsPage = () => {
	return (
		<div className="listingDetails">
			<div className="listingDetails__top">
				<h2 className="listingDetails__title">{listing.title} </h2>
				<span className="listingDetails__price">{listing.price}$</span>
				<span className="button button-primary button-outline listingDetails__addToCart">
					<i className="fa fa-shopping-cart"></i> add to cart
				</span>
			</div>
			<p className="listingDetails__seller">
				by{" "}
				<a href="#!" className="link link-primary">
					{listing.user.name}
				</a>
			</p>
			{/* Will be replaced by a carosell */}
			<img
				src={listing.photo}
				alt={listing.title}
				className="listingDetails__photo"
			/>
			<p className="listingDetails__description">{listing.description}</p>
		</div>
	);
};

export default ListingDetailsPage;
