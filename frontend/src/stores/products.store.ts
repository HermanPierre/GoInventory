import {create} from 'zustand';
import { getProducts } from '../services/products.service';
import {Product} from "../types/product";

interface ProductStore {
    products: Product[];
    setProducts: (newProducts: Product[]) => void;
    initializeProducts: () => Promise<void>;
    deleteProductFromStore: (productId: number) =>  void;
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
    deleteProductFromStore: (productId) => {
        set((state) => {
            const updatedProducts = state.products.filter((product) => product.product_id !== productId);
            return { products: updatedProducts };
        });
    },
}));

export default useProductStore;
