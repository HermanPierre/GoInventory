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

export const createCategory = async (newCategoryName: string) => {
    try {
        let url = `${config.API_URL}/categories`;

        const response = await axios.post<Category>(url, { category_name: newCategoryName });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (categoryId: number) => {
    try {
        let url = `${config.API_URL}/categories?category_id=${categoryId}`;

        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};