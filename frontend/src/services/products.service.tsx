import axios from 'axios';
import config from "../config";
import {Product} from "../types/product";

export const getProducts = async (productId: number | undefined) => {
    try {
        let url = `${config.API_URL}/products`;

        if (productId) {
            url += `?productId=${productId}`;
        }

        const response = await axios.get<Product[]>(url);

        return response.data;
    } catch (error) {
        throw error;
    }
};