import React from "react";
import Card from "../components/Card";

const listings = [
	{
		id: 1,
		title: "Couch",
		description:
			" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta libero vitae magni, saepe deleniti non voluptate quaerat veniam? Fuga ipsam incidunt deleniti doloremque quis hic est in doloribus officia?",
		price: 100,
		photo: "http://www.donewithit.com/storage/listings/couch-photo.jpg",
	},
	{
		id: 2,
		title: "Limited edition red jacket",
		description:
			" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta libero vitae magni, saepe deleniti non voluptate quaerat veniam? Fuga ipsam incidunt deleniti doloremque quis hic est in doloribus officia?",
		price: 40,
		photo: "http://www.donewithit.com/storage/listings/jacket-photo.jpg",
	},
	{
		id: 3,
		title: "Couch",
		description:
			" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta libero vitae magni, saepe deleniti non voluptate quaerat veniam? Fuga ipsam incidunt deleniti doloremque quis hic est in doloribus officia?",
		price: 100,
		photo: "http://www.donewithit.com/storage/listings/couch-photo.jpg",
	},
	{
		id: 4,
		title: "Limited edition red jacket",
		description:
			" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta libero vitae magni, saepe deleniti non voluptate quaerat veniam? Fuga ipsam incidunt deleniti doloremque quis hic est in doloribus officia?",
		price: 40,
		photo: "http://www.donewithit.com/storage/listings/jacket-photo.jpg",
	},
	{
		id: 5,
		title: "Couch",
		description:
			" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta libero vitae magni, saepe deleniti non voluptate quaerat veniam? Fuga ipsam incidunt deleniti doloremque quis hic est in doloribus officia?",
		price: 100,
		photo: "http://www.donewithit.com/storage/listings/couch-photo.jpg",
	},
	{
		id: 6,
		title5: "Limited edition red jacket",
		description:
			" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta libero vitae magni, saepe deleniti non voluptate quaerat veniam? Fuga ipsam incidunt deleniti doloremque quis hic est in doloribus officia?",
		price: 40,
		photo: "http://www.donewithit.com/storage/listings/jacket-photo.jpg",
	},
	{
		id: 7,
		title: "Couch",
		description:
			" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta libero vitae magni, saepe deleniti non voluptate quaerat veniam? Fuga ipsam incidunt deleniti doloremque quis hic est in doloribus officia?",
		price: 100,
		photo: "http://www.donewithit.com/storage/listings/couch-photo.jpg",
	},
	{
		id: 8,
		title: "Limited edition red jacket",
		description:
			" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta libero vitae magni, saepe deleniti non voluptate quaerat veniam? Fuga ipsam incidunt deleniti doloremque quis hic est in doloribus officia?",
		price: 40,
		photo: "http://www.donewithit.com/storage/listings/jacket-photo.jpg",
	},
];

const ListingsPage = () => {
	return (
		<div className="listings">
			<div className="listings__feed">
				{listings.map(listing => (
					<Card
						key={listing.id}
						image={listing.photo}
						title={listing.title}
						subtitle={listing.price + "$"}
						details={listing.description.substr(0, 80) + "..."}
					/>
				))}
			</div>
		</div>
	);
};

export default ListingsPage;
