import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import categoriesApi from "../api/categories";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import ImageInput from "../components/forms/ImageInput";
import Submit from "../components/forms/Submit";
import FormSelect from "../components/forms/FormSelect";

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

const CreateListingPage = () => {
	const [categories, setCategories] = useState([]);

	const getCategories = async () => {
		const res = await categoriesApi.getCategories();
		setCategories(res.data);
	};
	useEffect(() => {
		getCategories();
	}, []);
	return (
		<div className="createListing">
			<h1 className="createListing__title">Create a New Listing</h1>
			<Form
				className="createListing__form"
				initialValues={{
					description: "",
					categoryId: "",
					photo: "",
					price: 1,
					title: "",
				}}
				onSubmit={values => console.log(values)}
				validationSchema={validationSchema}
			>
				<ImageInput name="photo" />
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
	);
};

export default CreateListingPage;
