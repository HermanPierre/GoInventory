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

export const createProduct = async (newProduct: Product) => {
    try {
        console.log(newProduct)
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
