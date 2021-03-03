import { useState, useEffect } from "react";
import categoriesApi from "../api/categories";

const useCategories = () => {
	const [categories, setCategories] = useState([]);

	const getCategories = async () => {
		const res = await categoriesApi.getCategories();
		setCategories(res.data);
	};
	useEffect(() => {
		getCategories();
	}, []);

	return categories;
};
export default useCategories;
