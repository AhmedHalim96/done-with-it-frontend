import { useState } from "react";
const useApi = apiFunc => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const request = async (...args) => {
		setLoading(true);
		const res = await apiFunc(...args);

		setLoading(false);
		setError(!res.ok);
		if (res.data) setData(res.data.data);
		return res;
	};

	return { data, error, loading, request };
};

export default useApi;
