import { useState } from "react";
const useApi = apiFunc => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);
	const [errors, setErrors] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const request = async (...args) => {
		setLoading(true);
		const res = await apiFunc(...args);

		setLoading(false);
		setError(!res.ok);
		if (!res.ok) {
			setErrorMessage(res.data.message);
			// merging errors in one array
			if (res.data.errors) {
				let errors = [];
				Object.values(res.data.errors).forEach(el => {
					errors = [...errors, ...el];
				});

				setErrors(errors);
			}
		}

		if (res.data) setData(res.data.data);
		console.log(res.data);
		return res;
	};

	return { data, error, errors, loading, request, errorMessage };
};

export default useApi;
