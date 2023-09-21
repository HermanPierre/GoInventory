import React, {useEffect, useState} from 'react';
import useGoInventoryStore from "../../../stores/products.store";
import CategoryModal from "../../category-modal/category-modal";

const TableTop = () => {
    const {categories, setSelectedCategoryId, fillProducts} = useGoInventoryStore((state) => state);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = async () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value);
        // const selectedCategory = categories.find(cat => cat.category_id = selectedValue)
        console.log({categories})
        console.log({selectedValue})
        setSelectedCategoryId(selectedValue != 0 ? selectedValue : undefined);
        fillProducts();
    };

    useEffect(() => {
    }, [categories]);

    return (
        <div className={'flex justify-between bg-gray-700 text-white p-1'}>
            <h2 className={'font-bold text-xl'}>Produits</h2>
            <div className={'flex w-1/2 justify-end gap-2 items-center'}>
                <h2 className={'font-bold text-l'}>Catégorie</h2>
                <select className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-1/2'}
                        defaultValue="1"
                        onChange={handleCategoryChange}>
                    <option value={'0'}>Aucune séléction</option>
                    {categories.map((category, index) => {
                        return <option key={index} value={category.category_id}>{category.category_name}</option>
                    })}
                </select>
                <button
                    className={'bg-blue-500 text-white text-sm px-3 py-1 rounded'}
                    onClick={toggleModal}
                >
                    ✏️
                </button>
            </div>
            {isModalOpen && <CategoryModal close={toggleModal}/>}
        </div>
    );
};

export default TableTop;
