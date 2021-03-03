import { Formik, Form } from "formik";
import React from "react";

const AppForm = ({
	initialValues,
	onSubmit,
	validationSchema,
	className = "",
	children,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{() => <Form className={"form " + className}>{children}</Form>}
		</Formik>
	);
};

export default AppForm;
