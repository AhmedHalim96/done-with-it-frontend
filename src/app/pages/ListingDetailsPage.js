import React, { useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import Spinner from "../components/layout/Spinner";
import AuthContext from "../auth/context";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";
import settings from "../config/settings";
import ImageSlider from "../components/ImageSlider";
import Alert from "../components/Alert";

const user = {
	id: 2,
	name: "Ahmed Halim",
	avatar: "http://192.168.1.111:8000/storage/listings/jacket-photo.jpg",
	listing: 12,
};

const ListingDetailsPage = () => {
	const listingId = useParams().listingId;
	const redirect = useHistory().push;

	const {
		data: listing,
		error: getListingError,
		errorMessage: getListingErrorMessage,
		loading: getListingLoading,
		request: getListing,
	} = useApi(listingsApi.getListingDetails);

	const {
		data: deletedListingId,
		error: deleteListingError,
		errorMessage: deleteListingErrorMessage,
		loading: deleteListingLoading,
		request: deleteListing,
	} = useApi(listingsApi.removeListing);

	const { isAuthenticated } = useContext(AuthContext);

	const _error = getListingError || deleteListingError;
	const _loading = getListingLoading || deleteListingLoading;

	const _getListing = async () => await getListing(listingId);
	const _removeListing = async () => {
		const res = await deleteListing(listingId);
		if (!res.ok) return;

		redirect("/");
	};

	useEffect(() => {
		_getListing();
	}, []);

	return (
		<>
			{_loading && (
				<Spinner loading={_loading} backdrop={deleteListingLoading} />
			)}

			{_error && (
				<Alert message={getListingErrorMessage || deleteListingErrorMessage} />
			)}

			{listing && (
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

						{isAuthenticated && (
							<>
								<Link
									to={"/update/" + listing.id}
									className="button button-secondary button-outline"
									title="Update Listing"
								>
									<i className="fa fa-pencil"></i> Edit
								</Link>
								<span
									className="button button-danger button-outline"
									title="Delete Listing"
									onClick={_removeListing}
								>
									<i className="fa fa-trash"></i> Delete
								</span>
							</>
						)}
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
							{user.name}
						</Link>
					</p>

					<ImageSlider
						images={listing.photos.map(image => settings.baseUrl + image.url)}
					/>

					<p className="listingDetails__description u-mt-2">
						{listing.description}
					</p>
				</div>
			)}
		</>
	);
};

export default ListingDetailsPage;
