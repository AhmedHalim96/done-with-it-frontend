import { Formik, Form } from "formik";
import React from "react";

const AppForm = ({ initialValues, onSubmit, valdiationSchema, children }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={valdiationSchema}
		>
			{() => <Form className="form">{children}</Form>}
		</Formik>
	);
};

export default AppForm;
