import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import Branding from "../components/Branding";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import Submit from "../components/forms/Submit";
import settings from "../config/settings";
import routes from "../navigation/routes";
const valdiationSchema = Yup.object().shape({
	email: Yup.string().email().label("Email").required(),
	password: Yup.string().label("Password").min(5).required(),
});

const LoginPage = () => {
	return (
		<div
			className="login"
			style={{
				backgroundImage: "url(" + settings.assetsUrl + "/bg.jpg)",
			}}
		>
			<div className="login__centerBox">
				<Branding />
				<Form
					initialValues={{ email: "", password: "" }}
					onSubmit={values => console.log(values)}
					valdiationSchema={valdiationSchema}
				>
					<FormField name="email" type="text" label="Email" block />
					<FormField name="password" type="password" label="Password" block />
					<Submit title="Login" className="button-block" />
					<p className="paragraph">
						Not A Member?{" "}
						<Link to={routes.REGISTER} className="link">
							Sign up now!
						</Link>
					</p>
				</Form>
			</div>
		</div>
	);
};

export default LoginPage;
