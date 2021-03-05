import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import listingsApi from "../api/listings";

import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import FormSelect from "../components/forms/FormSelect";
import ImageInput from "../components/forms/ImageInput";
import Submit from "../components/forms/Submit";
import settings from "../config/settings";
import useCategories from "../hooks/useCategories";

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
	photo: Yup.mixed()
		.required("A Photo is required")
		.test("fileFormat", "Unsupported Format", value => {
			if (value && typeof value === "string") {
				return true;
			}

			return value && SUPPORTED_FORMATS.includes(value.type);
		})
		.test("fileSize", "File too large", value => {
			if (value && typeof value === "string") {
				return true;
			}
			return value && value.size <= FILE_SIZE;
		}),
});

const EditListingPage = () => {
	const categories = useCategories();
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

	const updateListing = async values => {
		const updatedListing = {};
		if (values.title !== listing.title) updatedListing.title = values.title;
		if (values.photo !== listing.photo) updatedListing.photo = values.photo;
		if (values.price !== listing.price) updatedListing.price = values.price;
		if (values.description !== listing.description)
			updatedListing.description = values.description;
		if (values.categoryId !== listing.category.id)
			updatedListing.categoryId = values.categoryId;

		if (Object.keys(updatedListing).length === 0)
			return alert("Nothing Changed");

		updatedListing.id = listing.id;

		const res = await listingsApi.updateListing(updatedListing);
		if (!res.ok) return console.log(res.data);
		console.log(res.data);
	};

	useEffect(() => {
		getListing();
	}, []);

	return (
		listing && (
			<div className="editListing">
				<h1 className="editListing__title">Edit Listing</h1>
				<Form
					className="editListing__form"
					initialValues={{
						description: listing.description,
						photo: listing.photo,
						price: listing.price,
						title: listing.title,
						categoryId: listing.category.id,
					}}
					onSubmit={updateListing}
					validationSchema={validationSchema}
				>
					<ImageInput name="photo" url={settings.baseUrl + listing.photo} />
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
