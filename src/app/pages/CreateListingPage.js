import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import * as Yup from "yup";

import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import ImageInput from "../components/forms/ImageInput";
import Submit from "../components/forms/Submit";
import FormSelect from "../components/forms/FormSelect";
import useCategories from "../hooks/useCategories";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";
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
	description: Yup.string().label("Description").min(5).max(255),
	categoryId: Yup.number()
		.label("Category")
		.required("You must choose a category"),
	photos: Yup.array()
		.test("arrayLength", "At least one image is required", images => {
			return images.length > 0;
		})
		.test("arrayLength", "Up to 5 images are allowed", images => {
			return images.length <= 5;
		})
		.of(
			Yup.mixed()
				.test(
					"fileFormat",
					"Unsupported Format",
					value => value && SUPPORTED_FORMATS.includes(value.type)
				)
				.test(
					"fileSize",
					"File too large",
					value => value && value.size <= FILE_SIZE
				)
		),
});

const CreateListingPage = () => {
	const categories = useCategories();
	const redirect = useHistory().push;
	const { error, loading, request: createListing } = useApi(
		listingsApi.addListing
	);

	const addListing = async listing => {
		// work around
		const {
			data: { data: createdListing },
		} = await createListing(listing);
		if (error) return console.log(error);
		redirect("/listings/" + createdListing.id);
	};

	return (
		<div className="createListing">
			{loading && <Spinner loading={loading} backdrop />}
			<h1 className="createListing__title">Create a New Listing</h1>
			<Form
				className="createListing__form"
				initialValues={{
					description: "",
					categoryId: "",
					photos: [],
					price: 1,
					title: "",
				}}
				onSubmit={addListing}
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

				<Submit title="Create Listing" className="button-block" />
			</Form>
		</div>
	);
};

export default CreateListingPage;
