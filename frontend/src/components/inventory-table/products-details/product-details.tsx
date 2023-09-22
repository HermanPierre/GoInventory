import React, {useEffect, useState} from 'react';
import SemiBoldTitle from "../../../shared/SemiboldTitle";
import {Product} from "../../../types/product";
import useGoInventoryStore from "../../../stores/products.store";
import ProductModal from "../../product-modal/product-modal";
import {deleteProduct} from "../../../services/products.service";
import VersionsModal from "../../version-modal/version-modal";

interface ProductDetailsType {
    product: Product
}

const ProductDetails = ({product}: ProductDetailsType) => {
    const [isModalEditOpen, setIsModalEditOpen] = useState(false); // État pour contrôler l'ouverture de la modal
    const [isModalVersionOpen, setIsModalVersionOpen] = useState(false); // État pour contrôler l'ouverture de la modal
    const {fillProducts, deleteProductFromStore} = useGoInventoryStore((state) => state);

    const toggleEditModal = () => {
        setIsModalEditOpen(!isModalEditOpen);
    }

    const toggleVersionModal = () => {
        setIsModalVersionOpen(!isModalVersionOpen);
    }

    const productDelete = async () => {
        if (!product.product_id) return
        await deleteProduct(product.product_id);
        deleteProductFromStore(product.product_id)
    }

    useEffect(() => {
        if (!isModalEditOpen)
            fillProducts()
    }, [isModalEditOpen]);

    return (
        <div className={'flex flex-col gap-1'}>
            <div className={'flex justify-between items-center'}>
                <div className={'flex gap-1'}>
                    <SemiBoldTitle title="Quantité:"/>
                    <span>{product.quantity}</span>
                </div>
                <div className={'flex gap-1'}>
                    <button
                        onClick={toggleVersionModal}
                        className="bg-green-300 text-white font-semibold px-2 py-0.5 rounded self-end">
                        🕘
                    </button>
                    <button
                        onClick={toggleEditModal}
                        className="bg-gray-500 text-white font-semibold px-2 py-0.5 rounded self-end">
                        Editer
                    </button>
                    <button
                        onClick={productDelete}
                        className="bg-red-500 text-white font-semibold px-2 py-0.5 rounded self-end hover:bg-red-600">
                        Supprimer
                    </button>
                </div>
            </div>
            <div className={'flex flex-col'}>
                <SemiBoldTitle title="Description:"/>
                <span className={'text-sm'}>
                    {product.description}
                </span>
            </div>
            <div className={'flex justify-between items-center'}>
                <div className={'flex gap-1'}>
                    <SemiBoldTitle title="ID:"/>
                    <span>{product.product_id}</span>
                </div>
                <div className={'flex gap-1'}>
                    <SemiBoldTitle title="Catégorie:"/>
                    <span>{product.category_name}</span>
                </div>
            </div>
            {isModalEditOpen && <ProductModal productToUpdate={product} close={toggleEditModal}/>}
            {isModalVersionOpen && <VersionsModal product={product} close={toggleVersionModal}/>}
        </div>
    );
};

export default ProductDetails;
