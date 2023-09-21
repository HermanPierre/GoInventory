import React, {useEffect, useState} from 'react';
import TableTop from "./table-top/table-top";
import TableRow from "./table-row/table-row";
import useGoInventoryStore from "../../stores/products.store";
import ProductModal from "../product-modal/product-modal";

const InventoryTable = () => {
    const {products, fillStore} = useGoInventoryStore((state) => state);
    const [accordionOpened, setAccordionOpened] = useState<number>();
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture de la modal

    const toggleModal = async () => {
        if (isModalOpen) {
            await fillStore();
        }
        setIsModalOpen(!isModalOpen);
    }
    const toggleAccordion = (index: number) => {
        setAccordionOpened(accordionOpened != index ? index : undefined);
    };

    useEffect(() => {
        fillStore();
    }, [])

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
            </div>
            <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded shadow-lg shadow-blue-500">
                Ajouter un produit +
            </button>
            {isModalOpen && <ProductModal close={toggleModal} />}
        </div>
    );
};

export default InventoryTable;
