import { Formik, Form } from "formik";
import React from "react";

const AppForm = ({
	initialValues,
	onSubmit,
	valdiationSchema,
	className = "",
	children,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={valdiationSchema}
		>
			{() => <Form className={"form " + className}>{children}</Form>}
		</Formik>
	);
};

export default AppForm;
