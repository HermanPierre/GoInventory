import React, {useState} from 'react';
import {Product} from "../../types/product";
import {createProduct, updateProduct} from "../../services/products.service";
import useGoInventoryStore from "../../stores/products.store";

interface ProductModalType {
    close: () => void
    productToUpdate?: Product | undefined
}

const ProductModal = ({close, productToUpdate}: ProductModalType) => {
    const {categories} = useGoInventoryStore((state) => state)

    // Définition de l'état initial d'un produit
    const initialProductState: Product = {
        name: productToUpdate?.name || '',
        description: productToUpdate?.description || '',
        category_id: productToUpdate?.category_id || categories[0].category_id,
        quantity: productToUpdate?.quantity || 1,
    };

    const [product, setProduct] = useState<Product>(initialProductState);


    // Fonction 'addNewProduct' pour ajouter un nouveau produit
    const addNewProduct = async () => {
        await createProduct(product);
        setProduct(initialProductState);
        close()
    }

    // Fonction 'updateSelectedProduct' pour mettre à jour un produit existant
    const updateSelectedProduct = async () => {
        if (!productToUpdate) return
        await updateProduct({product_id: productToUpdate?.product_id, ...product});
        setProduct(initialProductState);
        close()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: Number(value) });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(e.target.value);
        setProduct({ ...product, category_id: categoryId });
    };

    // Gestionnaire d'envoi du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (productToUpdate)
            await updateSelectedProduct()
        else
            await addNewProduct();
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
                            value={product.name}
                            onChange={handleInputChange}
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
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
                            value={product.quantity}
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
                            value={product.category_id}
                            onChange={handleCategoryChange}
                            className="border rounded w-full p-2"
                            required
                        >
                            {categories.map(((category, index) => (
                                <option key={index} value={category.category_id}>
                                    {category.category_name}
                                </option>
                            )))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {productToUpdate ? 'Editer' : 'Ajouter'}
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
