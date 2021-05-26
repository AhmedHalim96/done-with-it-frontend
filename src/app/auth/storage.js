const storeUser = user => {
	user = JSON.stringify(user);
	localStorage.setItem("user", user);
};

const getUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const removeUser = () => {
	localStorage.removeItem("user");
};

const AuthStorage = { storeUser, getUser, removeUser };

export default AuthStorage;
