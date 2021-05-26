import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import usersApi from "../api/users";

import Spinner from "../components/layout/Spinner";
import SubmitErrorList from "../components/forms/SubmitErrorList";
import Branding from "../components/Branding";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import Submit from "../components/forms/Submit";
import settings from "../config/settings";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
	email: Yup.string().email().label("Email").required(),
	password: Yup.string().label("Password").required(),
});

const LoginPage = () => {
	const {
		error,
		errors,
		errorMessage,
		loading,
		request: loginUser,
	} = useApi(usersApi.loginUser);

	const { setAuthenticated, setUser } = React.useContext(AuthContext);

	const _login = async _user => {
		const res = await loginUser(_user);
		setAuthenticated(true);
		setUser(res.data);
		AuthStorage.storeUser(res.data);
	};

	return (
		<>
			{loading && <Spinner loading={loading} backdrop={loading} />}

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
						onSubmit={_login}
						validationSchema={validationSchema}
					>
						<FormField name="email" type="text" label="Email" block />
						<FormField name="password" type="password" label="Password" block />
						<SubmitErrorList
							error={error}
							errorMessage={errorMessage}
							errors={errors}
						/>
						<Submit title="Login" className="button-block" />
						<p className="paragraph">
							Not A Member?{" "}
							<Link to={routes.REGISTER} className="link link-primary">
								Sign up now!
							</Link>
						</p>
					</Form>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
