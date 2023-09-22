import axios from 'axios';
import config from "../config";
import {Product} from "../types/product";

interface getProductQuery {
    productId?: number | undefined
    categoryId?: number | undefined
}
export const getProducts = async ({productId, categoryId}: getProductQuery) => {
    try {
        let url = `${config.API_URL}/products`;

        if (productId) {
            url += `?productId=${productId}`;
        }

        if (categoryId) {
            url += `?categoryId=${categoryId}`;
        }

        const response = await axios.get<Product[]>(url);

        return response.data || [];
    } catch (error) {
        throw error;
    }
};

export const createProduct = async (newProduct: Product) => {
    try {
        const url = `${config.API_URL}/products`;

        const response = await axios.post<Product>(url, newProduct);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (updatedProduct: Product) => {
    try {
        const url = `${config.API_URL}/products`;

        const response = await axios.put<Product>(url, updatedProduct);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (productId: number) => {
    try {
        const url = `${config.API_URL}/products?product_id=${productId}`;

        const response = await axios.delete(url);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProductVersions = async (productId: number) => {
    try {
        const url = `${config.API_URL}/versions?product_id=${productId}`;
        const response = await axios.get<Product[]>(url);

        return response.data || [];
    } catch (error) {
        throw error;
    }
};
