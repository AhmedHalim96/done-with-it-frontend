import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import listingsApi from "../api/listings";

import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
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
	photo: Yup.mixed()
		.required("A Photo is required")
		.test(
			"fileFormat",
			"Unsupported Format",
			value => value && SUPPORTED_FORMATS.includes(value.type)
		)
		.test(
			"fileSize",
			"File too large",
			value => value && value.size <= FILE_SIZE
		),
});

const EditListingPage = () => {
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
					onSubmit={values => console.log(values)}
					validationSchema={validationSchema}
				>
					<ImageInput name="photo" url={listing.photo} />
					<FormField block type="text" name="title" label="Title" />
					<FormField
						label="Price"
						min="1"
						max="1000"
						name="price"
						type="number"
						suffix="$"
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
		)
	);
};

export default EditListingPage;
