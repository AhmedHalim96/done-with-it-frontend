const storeUser = user => {
	storeToken(user.token);
	user = JSON.stringify(user);
	localStorage.setItem("user", user);
};

const getUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const removeUser = () => {
	localStorage.removeItem("user");
};

const getToken = () => {
	return localStorage.getItem("authToken");
};

const storeToken = token => {
	localStorage.setItem("authToken", token);
};
const AuthStorage = { storeUser, getUser, removeUser, getToken };

export default AuthStorage;
