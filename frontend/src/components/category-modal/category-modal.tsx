import React, { useState } from 'react';
import useGoInventoryStore from '../../stores/products.store';
import {createCategory, deleteCategory} from "../../services/categories.service";

interface ProductModalType {
    close: () => void
}
const CategoryModal = ({ close }: ProductModalType) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const { categories, fillCategories, fillProducts } = useGoInventoryStore((state) => state);

    // Fonction 'handleAddCategory' appelée lors de l'ajout d'une nouvelle catégorie
    const handleAddCategory = async () => {
        if (newCategoryName.trim() === '') {
            return;
        }
        try {
            await createCategory(newCategoryName);
            await fillCategories();
            setNewCategoryName('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie :', error);
        }
    };

    // Fonction 'handleDeleteCategory' appelée lors de la suppression d'une catégorie existante
    const handleDeleteCategory = async (categoryId: number) => {
        try {
            await deleteCategory(categoryId);
            await fillCategories();
            await fillProducts();
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie :', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-lg w-1/2">
                <h2 className="text-lg font-semibold mb-4 text-gray-950">Gérer les catégories</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nouvelle catégorie</label>
                    <input
                        data-testid='input-cat'
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="border rounded w-full p-2 text-gray-950"
                    />
                </div>
                <button
                    data-testid='add-cat'
                    onClick={handleAddCategory}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Ajouter une catégorie
                </button>
                <ul className="mt-4">
                    {categories.map((category, index) => (
                        <li key={index} data-testid={`cat-${index}`}
                            className="flex justify-between items-center mb-2">
                            <span className={'text-gray-950'}>{category.category_name}</span>
                            <button
                                onClick={() => handleDeleteCategory(category.category_id)}
                                data-testid={`delete-${index}`}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
                <button data-testid="close-modal"
                        onClick={close}
                        className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                    Fermer la modal
                </button>
            </div>
        </div>
    );
};

export default CategoryModal;
