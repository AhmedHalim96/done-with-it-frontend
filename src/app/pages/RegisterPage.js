import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import Spinner from "../components/layout/Spinner";
import SubmitErrorList from "../components/forms/SubmitErrorList";
import Branding from "../components/Branding";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import Submit from "../components/forms/Submit";
import settings from "../config/settings";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";

const validationSchema = Yup.object().shape({
	name: Yup.string().label("Name").required(),
	email: Yup.string().email().label("Email").required(),
	password: Yup.string().label("Password").min(5).required(),
	c_password: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match!")
		.required("Confirm Password is a required field!"),
});

const RegisterPage = () => {
	const {
		data: user,
		error,
		errors,
		errorMessage,
		loading,
		request: registerUser,
	} = useApi(usersApi.registerUser);

	const redirectTo = useHistory().push;

	const _register = async user => {
		await registerUser(user);
		redirectTo("/login");
	};

	return (
		<>
			{loading && <Spinner loading={loading} backdrop={loading} />}
			<div
				className="register"
				style={{
					backgroundImage: "url(" + settings.assetsUrl + "/bg.jpg)",
				}}
			>
				<div className="register__centerBox">
					<Branding />
					<Form
						initialValues={{
							name: "",
							email: "",
							password: "",
							c_password: "",
						}}
						onSubmit={_register}
						validationSchema={validationSchema}
					>
						<FormField name="name" type="text" label="Name" block />
						<FormField name="email" type="text" label="Email" block />
						<FormField name="password" type="password" label="Password" block />
						<FormField
							name="c_password"
							type="password"
							label="Confirm Password"
							block
						/>
						<input type="submit" hidden />
						<SubmitErrorList
							error={error}
							errorMessage={errorMessage}
							errors={errors}
						/>
						<Submit title="Register" className="button-block" />
						<p className="paragraph">
							Already A Member?{" "}
							<Link to={routes.LOGIN} className="link">
								Sign In!
							</Link>
						</p>
					</Form>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
