import React, {useEffect, useState} from 'react';
import TableTop from "./table-top/table-top";
import TableRow from "./table-row/table-row";
import useGoInventoryStore from "../../stores/products.store";
import ProductModal from "../product-modal/product-modal";

const InventoryTable = () => {
    const {products, fillProducts} = useGoInventoryStore((state) => state);
    const [accordionOpened, setAccordionOpened] = useState<number>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = async () => {
        if (isModalOpen) {
            await fillProducts();
        }
        setIsModalOpen(!isModalOpen);
    }
    const toggleAccordion = (index: number) => {
        setAccordionOpened(accordionOpened != index ? index : undefined);
    };

    return (
        <div className="flex flex-1 flex-col w-full justify-center items-center">
            <div className={'overflow-y-scroll bg-white rounded shadow-lg w-1/2 h-[60vh]'}>
                <TableTop/>
                {products.map((product, index) => {
                    return (
                        <TableRow key={index}
                                  product={product}
                                  isOpen={index === accordionOpened}
                                  onClick={() => toggleAccordion(index)}
                        />)
                })}
                {products.length === 0 && <div className={'text-center'}><span>Aucun produit...</span></div>}
            </div>
            <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded shadow-lg shadow-blue-500">
                Ajouter un produit +
            </button>
            {isModalOpen && <ProductModal close={toggleModal} />}
        </div>
    );
};

export default InventoryTable;
