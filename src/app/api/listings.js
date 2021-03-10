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
	listing.photos.map(photo => data.append("photos[]", photo));
	return client.post(endpoint, data);
};

const updateListing = listing => {
	const data = new FormData();
	if (listing.title) data.append("title", listing.title);
	if (listing.price) data.append("price", listing.price);
	if (listing.description) data.append("description", listing.description);
	if (listing.categoryId) data.append("category_id", listing.categoryId);
	if (listing.photo) data.append("photo", listing.photo);

	data.append("_method", "PATCH");
	return client.post(endpoint + "/" + listing.id, data);
};

const removeListing = listingId => client.delete(endpoint + "/" + listingId);

const listingsApi = {
	addListing,
	getListings,
	getListingDetails,
	updateListing,
	removeListing,
};

export default listingsApi;
