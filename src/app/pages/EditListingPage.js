import React, { useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as Yup from "yup";

import listingsApi from "../api/listings";
import AuthContext from "../auth/context";
import useCategories from "../hooks/useCategories";
import useApi from "../hooks/useApi";

import Alert from "../components/Alert";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import FormSelect from "../components/forms/FormSelect";
import ImageInput from "../components/forms/ImageInput";
import Submit from "../components/forms/Submit";
import Spinner from "../components/layout/Spinner";

const FILE_SIZE = 2000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object().shape({
	title: Yup.string().label("Title").min(5).max(90).required(),
	price: Yup.number()
		.label("Price")
		.min(1)
		.max(1000)
		.required("Price Must be an number between 1 and 1000"),
	categoryId: Yup.number()
		.label("Category")
		.required("You must choose a category"),
	description: Yup.string().label("Description").min(5).max(255),
	photos: Yup.array()
		.test("arrayLength", "At least one image is required", images => {
			return images.length > 0;
		})
		.test("arrayLength", "Up to 5 images are allowed", images => {
			return images.length <= 5;
		})
		.of(
			Yup.mixed()
				.required("A Photo is required")
				.test("fileFormat", "Unsupported Format", value => {
					if (value.url) {
						return true;
					}

					return value && SUPPORTED_FORMATS.includes(value.type);
				})
				.test("fileSize", "File too large", value => {
					if (value.url) {
						return true;
					}
					return value && value.size <= FILE_SIZE;
				})
		),
});

const EditListingPage = () => {
	const categories = useCategories();
	const listingId = useParams().listingId;
	const redirect = useHistory().push;
	const { user } = useContext(AuthContext);
	const {
		data: listing,
		error: getListingError,
		errorMessage: getListingErrorMessage,
		loading: getListingLoading,
		request: getListing,
	} = useApi(listingsApi.getListingDetails);

	const {
		errorMessage: updateListingErrorMessage,
		error: updateListingError,
		loading: updateListingLoading,
		request: editListing,
	} = useApi(listingsApi.updateListing);

	const _error = getListingError || updateListingError;

	const _getListing = async () => {
		const {
			data: { data: listing },
		} = await getListing(listingId);
		if (user.id !== listing.user.id) redirect("/");
	};
	const _updateListing = async values => {
		const updatedListing = {};

		// Adding changed fields
		if (values.title !== listing.title) updatedListing.title = values.title;

		if (values.price !== listing.price) updatedListing.price = values.price;

		const photos = values.photos.filter(photo => !photo.url);
		if (photos.length) updatedListing.photos = photos;

		if (values.removedPhotos.length)
			updatedListing.removedPhotos = values.removedPhotos;

		if (values.description !== listing.description)
			updatedListing.description = values.description;

		if (values.categoryId !== listing.category.id)
			updatedListing.categoryId = values.categoryId;

		// Redirect if nothing changes
		if (Object.keys(updatedListing).length === 0)
			return redirect("/listings/" + listingId);

		updatedListing.id = listing.id;

		// Sending the request
		const res = await editListing(updatedListing);
		if (!res.ok) return;

		redirect("/listings/" + listingId);
	};

	useEffect(() => {
		_getListing();
	}, []);

	return (
		<>
			{(updateListingLoading || getListingLoading) && (
				<Spinner
					loading={updateListingLoading || getListingLoading}
					backdrop={updateListingLoading}
				/>
			)}

			{_error && (
				<Alert message={getListingErrorMessage || updateListingErrorMessage} />
			)}
			{listing && (
				<div className="editListing">
					<h1 className="editListing__title">Edit Listing</h1>
					<Form
						className="editListing__form"
						initialValues={{
							description: listing.description,
							photos: listing.photos,
							removedPhotos: [],
							price: listing.price,
							title: listing.title,
							categoryId: listing.category.id,
						}}
						onSubmit={_updateListing}
						validationSchema={validationSchema}
					>
						<ImageInput name="photos" />
						<FormField block type="text" name="title" label="Title" />
						<FormField
							label="Price"
							min="1"
							max="1000"
							name="price"
							type="number"
							suffix="$"
						/>

						<FormSelect
							items={categories}
							name="categoryId"
							label="Categories"
						/>

						<FormField
							block
							className="form__textarea"
							component="textarea"
							label="Description"
							name="description"
							placeholder="Description"
							rows="12"
						/>

						<Submit title="Update Listing" className="button-block" />
					</Form>
				</div>
			)}
		</>
	);
};

export default EditListingPage;
