import React, {useEffect, useState} from 'react';
import useGoInventoryStore from '../../stores/products.store';
import {getProductVersions} from '../../services/products.service';
import {Product} from "../../types/product";

interface VersionsModalType {
    product: Product;
    close: () => void;
}

const VersionsModal = ({product, close}: VersionsModalType) => {
    const [productVersions, setProductVersions] = useState<Product[]>([]);
    const {categories} = useGoInventoryStore((state) => state);

    useEffect(() => {
        const fetchProductVersions = async () => {
            if (!product.product_id) return
            try {
                const versions = await getProductVersions(product.product_id);
                setProductVersions(versions);
            } catch (error) {
                console.error('Erreur lors du chargement des versions du produit :', error);
            }
        };

        fetchProductVersions();
    }, [product]);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-lg w-1/2">
                <h2 className="text-lg font-semibold mb-4 text-gray-950">Versions du produit</h2>
                <ul className="mt-4">
                    <li data-testid={`version-0`} className="mb-2">
                        <p className="text-gray-950 font-semibold">
                            Version actuelle:
                        </p>
                        <p className="text-gray-700">{`Nom: ${product.name}`}</p>
                        <p className="text-gray-700">{`Description: ${product.description}`}</p>
                        <p className="text-gray-700">{`Quantité: ${product.quantity}`}</p>
                        <p className="text-gray-700">{`Catégorie: ${product.category_name}`}</p>
                        <p className="text-gray-700">{`Date de création: ${product.created_at}`}</p>
                    </li>
                </ul>
                <hr/>
                <div className="max-h-96 overflow-y-auto">
                    <ul className="mt-4">
                        {productVersions.map((version, index) => (
                            <li key={index} data-testid={`version-${index}`} className="mb-2">
                                <p className="text-gray-950 font-semibold">
                                    {`Version du ${version.created_at}:`}
                                </p>
                                <p className="text-gray-700">{`Nom: ${version.name}`}</p>
                                <p className="text-gray-700">{`Description: ${version.description}`}</p>
                                <p className="text-gray-700">{`Quantité: ${version.quantity}`}</p>
                                <p className="text-gray-700">
                                    {`Catégorie: ${categories.find(cat => cat.category_id === version.category_id)?.category_name}`}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                {productVersions.length === 0 && <p className="text-gray-700">Aucune ancienne version du produit...</p>}
                <button
                    data-testid="close-modal"
                    onClick={() => {
                        close();
                    }}
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                >
                    Fermer la modal
                </button>
            </div>
        </div>
    );
};

export default VersionsModal;
