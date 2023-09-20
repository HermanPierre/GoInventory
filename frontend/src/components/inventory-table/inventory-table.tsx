import React, {useEffect, useState} from 'react';
import TableTop from "./table-top/table-top";
import TableRow from "./table-row/table-row";
import {Product} from "../../types/product";
import {createProduct, getProducts} from "../../services/products.service";
import ProductModal from "../product-modal/product-modal";

const InventoryTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [accordionOpened, setAccordionOpened] = useState<number>();
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture de la modal

    const toggleModal = () => {
        console.log('hey')
        setIsModalOpen(!isModalOpen);
    }
    const toggleAccordion = (index: number) => {
        setAccordionOpened(accordionOpened != index ? index : undefined);
    };

    const addNewProduct = async (newProduct: Product) => {
        await createProduct(newProduct);
        setIsModalOpen(false)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(undefined);
                setProducts(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
            }
        };

        fetchProducts();
    }, [isModalOpen])

    return (
        <div className="flex flex-col w-1/2 min-h-1/2 max-h-1/3 items-center">
            <div className={'overflow-x-auto overflow-y-scroll bg-white rounded shadow-lg w-full h-full'}>
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
            <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded shadow-lg shadow-blue-500">
                Ajouter un produit +
            </button>
            {isModalOpen && <ProductModal addNewProduct={(newProduct) => addNewProduct(newProduct)} close={toggleModal} />}
        </div>
    );
};

export default InventoryTable;
