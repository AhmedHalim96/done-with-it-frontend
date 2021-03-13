import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import listingsApi from "../api/listings";
import useCategories from "../hooks/useCategories";
import useApi from "../hooks/useApi";

import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import FormSelect from "../components/forms/FormSelect";
import ImageInput from "../components/forms/ImageInput";
import Submit from "../components/forms/Submit";

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
	const {
		data: listing,
		error: getListingError,
		loading: getListingLoading,
		request: getListing,
	} = useApi(listingsApi.getListingDetails);

	const {
		data: updatedListing,
		error: editListingError,
		loading: editListingLoading,
		request: editListing,
	} = useApi(listingsApi.updateListing);

	const updateListing = async values => {
		const updatedListing = {};

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

		if (Object.keys(updatedListing).length === 0)
			return alert("Nothing Changed");

		updatedListing.id = listing.id;
		await editListing(updatedListing);
	};

	useEffect(() => {
		getListing(listingId);
	}, []);

	return (
		listing && (
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
					onSubmit={updateListing}
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

					<FormSelect items={categories} name="categoryId" label="Categories" />

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
		)
	);
};

export default EditListingPage;
