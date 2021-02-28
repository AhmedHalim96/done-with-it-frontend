import client from "./client";

const endpoint = "/categories";

const getCategories = () => client.get(endpoint);

const categoriesApi = { getCategories };

export default categoriesApi;
