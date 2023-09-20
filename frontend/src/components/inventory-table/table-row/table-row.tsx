import React, {useState} from 'react';
import ProductDetails from "../products-details/product-details";
import {Product} from "../../../types/product";

interface TableRowType {
    product: Product
    isOpen: boolean
    onClick: () => void
}
const TableRow = ({product, isOpen, onClick}: TableRowType) => {
    return (
        <div>
            <div className="cursor-pointer" onClick={onClick}>
                <div className="flex justify-between bg-white p-1">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="bg-white p-1 pt-0">
                    <hr className="mb-2 border-t border-gray-300" />
                    <ProductDetails product={product}/>
                </div>
            )}
        </div>
    );
};

export default TableRow;
