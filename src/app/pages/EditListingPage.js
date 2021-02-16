import React from "react";
import * as Yup from "yup";

import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import ImageInput from "../components/forms/ImageInput";
import Submit from "../components/forms/Submit";

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

const FILE_SIZE = 2000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const valdiationSchema = Yup.object().shape({
	title: Yup.string().label("Title").min(5).max(90).required(),
	price: Yup.number()
		.label("Price")
		.min(1)
		.max(1000)
		.required("Price Must be an number between 1 and 1000"),
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
	return (
		<div className="editListing">
			<h1 className="editListing__title">Edit Listing</h1>
			<Form
				className="editListing__form"
				initialValues={{
					description: listing.description,
					photo: listing.photo,
					price: listing.price,
					title: listing.title,
				}}
				onSubmit={values => console.log(values)}
				valdiationSchema={valdiationSchema}
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
					label="Decription"
					name="description"
					placeholder="Descrption"
					rows="12"
				/>

				<Submit title="Update Listing" className="button-block" />
			</Form>
		</div>
	);
};

export default EditListingPage;
