import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const getListingDetails = listingId => client.get(endpoint + "/" + listingId);

const addListing = listing => {
	const data = new FormData();
	data.append("title", listing.title);
	data.append("price", listing.price);
	data.append("description", listing.description);
	data.append("category_id", listing.categoryId);
	data.append("photo", listing.photo);

	return client.post(endpoint, data);
};

const listingsApi = {
	addListing,
	getListings,
	getListingDetails,
};

export default listingsApi;
