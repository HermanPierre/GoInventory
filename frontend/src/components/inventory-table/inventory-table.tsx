import React, {useEffect, useState} from 'react';
import TableTop from "./table-top/table-top";
import TableRow from "./table-row/table-row";
import {Product} from "../../types/product";
import {getProducts} from "../../services/products.service";

const InventoryTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [accordionOpened, setAccordionOpened] = useState<number>();

    const toggleAccordion = (index: number) => {
        setAccordionOpened(accordionOpened != index ? index : undefined);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(accordionOpened ? accordionOpened + 1 : undefined);
                setProducts(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
            }
        };

        fetchProducts();
    }, [])

    return (
        <div className="overflow-x-auto overflow-y-scroll w-1/2 bg-white rounded shadow-lg h-1/2">
            <TableTop/>
            {products.map((product, index) => {
                return (
                    <TableRow key={index}
                              product={product}
                              isOpen={index === accordionOpened}
                              onClick={() => toggleAccordion(index)}
                    />)
            })}
        </div>
    );
};

export default InventoryTable;
