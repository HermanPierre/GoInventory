import React from 'react';
import SemiBoldTitle from "../../../shared/SemiboldTitle";
import {Product} from "../../../types/product";

interface ProductDetailsType {
    product: Product
}

const ProductDetails = ({product}: ProductDetailsType) => {
    return (
        <div className={'flex flex-col gap-1'}>
            <div className={'flex justify-between items-center'}>
                <div className={'flex gap-1'}>
                    <SemiBoldTitle title="Quantité:"/>
                    <span>{product.quantity}</span>
                </div>
                <button className="bg-red-500 text-white font-semibold px-2 py-0.5 rounded self-end hover:bg-red-600">
                    Supprimer
                </button>
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
        </div>
    );
};

export default ProductDetails;
