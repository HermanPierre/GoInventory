import {create} from 'zustand';
import { getProducts } from '../services/products.service';
import {Product} from "../types/product";
import {Category} from "../types/categories";
import {getAllCategories} from "../services/categories.service";

interface GoInventoryStore {
    products: Product[];
    categories: Category[];
    selectedCategory: Category | undefined;
    setSelectedCategory: (category: Category | undefined) => void,
    setProducts: (newProducts: Product[]) => void;
    fillStore: () => Promise<void>;
    deleteProductFromStore: (productId: number) =>  void;
}

const useGoInventoryStore = create<GoInventoryStore>((set, get) => ({
    products: [],
    categories: [],
    selectedCategory: undefined,
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setProducts: (newProducts) => set({ products: newProducts }),
    fillStore: async () => {
        const selectedCategory = get().selectedCategory
        try {
            const products = await getProducts({categoryId: selectedCategory?.category_id});
            const categories = await getAllCategories();
            set({ products, categories });
        } catch (error) {
            console.error('Une erreur s\'est produite lors du remplissage du store :', error);
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
