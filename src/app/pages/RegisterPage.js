import React from "react";
import * as Yup from "yup";

import Branding from "../components/Branding";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import Submit from "../components/forms/Submit";

const valdiationSchema = Yup.object().shape({
	name: Yup.string().label("Name").required(),
	email: Yup.string().email().label("Email").required(),
	password: Yup.string().label("Password").min(5).required(),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match!")
		.required("Confirm Password is a required field!"),
});

const RegisterPage = () => {
	return (
		<div className="register">
			<div className="register__centerBox">
				<Branding />
				<Form
					initialValues={{
						name: "",
						email: "",
						password: "",
						confirmPassword: "",
					}}
					onSubmit={values => console.log(values)}
					valdiationSchema={valdiationSchema}
				>
					<FormField
						name="name"
						type="text"
						label="Name"
						className="form__input-block"
					/>
					<FormField
						name="email"
						type="text"
						label="Email"
						className="form__input-block"
					/>
					<FormField
						name="password"
						type="password"
						label="Password"
						className="form__input-block"
					/>
					<FormField
						name="confirmPassword"
						type="password"
						label="Confirm Password"
						className="form__input-block"
					/>
					<Submit title="Register" className="button-block" />
					<p className="paragraph">
						Already A Member?{" "}
						<a href="/login" className="link">
							Sign In!
						</a>
					</p>
				</Form>
			</div>
		</div>
	);
};

export default RegisterPage;
