import {create} from 'zustand';
import { getProducts } from '../services/products.service';
import {Product} from "../types/product";
import {Category} from "../types/categories";
import {getAllCategories} from "../services/categories.service";

interface GoInventoryStore {
    products: Product[];
    categories: Category[];
    notifications: string[];
    selectedCategoryId: number | undefined;
    setSelectedCategoryId: (category: number | undefined) => void,
    fillProducts: () => Promise<void>;
    fillCategories: () => Promise<void>;
    deleteProductFromStore: (productId: number) =>  void;
}

const generateNotifications = (newProducts: Product[], existingNotifications: string[]): string[] => {
    const lowQuantityProducts = newProducts.filter((product) => product.quantity < 5);
    const notifications = lowQuantityProducts.map(
        (product) => `Le produit "${product.name}" a une quantité inférieure à 5.`
    );
    return notifications;
}

const useGoInventoryStore = create<GoInventoryStore>((set, get) => ({
    products: [],
    categories: [],
    notifications: [],
    selectedCategoryId: undefined,
    setSelectedCategoryId: (category) => set({ selectedCategoryId: category }),
    fillProducts: async () => {
        const categoryId = get().selectedCategoryId
        try {
            const products = await getProducts({categoryId});
            set({ products });
            if (categoryId) return;
            const notifications = generateNotifications(products, get().notifications)
            set({notifications})
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
