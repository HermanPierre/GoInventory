import {create} from 'zustand';
import { getProducts } from '../services/products.service';
import {Product} from "../types/product";
import {Category} from "../types/categories";
import {getAllCategories} from "../services/categories.service";

interface GoInventoryStore {
    products: Product[];
    categories: Category[];
    selectedCategoryId: number | undefined;
    setSelectedCategoryId: (category: number | undefined) => void,
    setProducts: (newProducts: Product[]) => void;
    fillProducts: () => Promise<void>;
    fillCategories: () => Promise<void>;
    deleteProductFromStore: (productId: number) =>  void;
}

const useGoInventoryStore = create<GoInventoryStore>((set, get) => ({
    products: [],
    categories: [],
    selectedCategoryId: undefined,
    setSelectedCategoryId: (category) => set({ selectedCategoryId: category }),
    setProducts: (newProducts) => set({ products: newProducts }),
    fillProducts: async () => {
        const categoryId = get().selectedCategoryId
        console.log(categoryId)
        try {
            const products = await getProducts({categoryId});
            set({ products });
        } catch (error) {
            console.error('Une erreur s\'est produite lors du remplissage des produits dans le store :', error);
        }
    },
    fillCategories: async () => {
        try {
            const categories = await getAllCategories();
            set({ categories });
        } catch (error) {
            console.error('Une erreur s\'est produite lors du remplissage des categories dans le store :', error);
        }
    },
    deleteProductFromStore: (productId) => {
        set((state) => {
            const updatedProducts = state.products.filter((product) => product.product_id !== productId);
            return { products: updatedProducts };
        });
    },
}));

export default useGoInventoryStore;
