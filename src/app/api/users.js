import client from "./client";

const endpoint = "/user";

const registerUser = user => {
	const data = new FormData();
	data.append("name", user.name);
	data.append("email", user.email);
	data.append("password", user.password);
	data.append("c_password", user.c_password);
	return client.post(endpoint + "/register", data);
};

const loginUser = user => {
	const data = new FormData();
	data.append("email", user.email);
	data.append("password", user.password);
	return client.post(endpoint + "/login", data);
};

const usersApi = {
	registerUser,
	loginUser,
};

export default usersApi;
