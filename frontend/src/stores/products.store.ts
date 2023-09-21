import {create} from 'zustand';
import { getProducts } from '../services/products.service';
import {Product} from "../types/product";

interface ProductStore {
    products: Product[];
    setProducts: (newProducts: Product[]) => void;
    initializeProducts: () => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (newProducts) => set({ products: newProducts }),
    initializeProducts: async () => {
        try {
            const data = await getProducts(undefined);
            set({ products: data });
        } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'initialisation des produits :', error);
        }
    },
}));

export default useProductStore;
