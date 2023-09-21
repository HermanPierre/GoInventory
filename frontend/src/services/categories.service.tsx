import config from "../config";
import axios from "axios";
import {Category} from "../types/categories";

export const getAllCategories = async () => {
    try {
        let url = `${config.API_URL}/categories`;

        const response = await axios.get<Category[]>(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};