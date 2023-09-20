import React, {useState} from 'react';
import {Product} from "../../types/product";

interface ProductModalType {
    close: () => void
    addNewProduct: (newProduct: Product) => void
}
const ProductModal = ({close, addNewProduct}: ProductModalType) => {
    const categories = [
        { id: 1, name: 'Catégorie 1' },
        { id: 2, name: 'Catégorie 2' },
        { id: 3, name: 'Catégorie 3' },
        { id: 4, name: 'Catégorie 4' },
    ];

    const initialProductState: Product = {
        name: '',
        description: '',
        category_id: 1,
        quantity: 1,
    };

    const [newProduct, setNewProduct] = useState<Product>(initialProductState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: Number(value) });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(e.target.value);
        setNewProduct({ ...newProduct, category_id: categoryId });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addNewProduct(newProduct);
        setNewProduct(initialProductState);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Ajouter un produit</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            className="border rounded w-full p-2"
                            rows={3}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantité</label>
                        <input
                            type="number"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleQuantityChange}
                            className="border rounded w-full p-2"
                            min="1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <select
                            name="category_id"
                            value={newProduct.category_id}
                            onChange={handleCategoryChange}
                            className="border rounded w-full p-2"
                            required
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
                <button onClick={close} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                    Fermer la modal
                </button>
            </div>
        </div>
    );
};

export default ProductModal;
