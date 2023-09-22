import React, {useEffect, useState} from 'react';
import useGoInventoryStore from "../../../stores/products.store";
import CategoryModal from "../../category-modal/category-modal";
import NotificationModal from "../../notifications-modal/notifications-modal";

const TableTop = () => {
    const {categories, notifications, setSelectedCategoryId, fillProducts} = useGoInventoryStore((state) => state);
    const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
    const [isModalNotifOpen, setIsModalNotifOpen] = useState(false);

    const toggleCategoryModal = async () => {
        setIsModalCategoryOpen(!isModalCategoryOpen);
    }

    const toggleNotifModal = async () => {
        setIsModalNotifOpen(!isModalNotifOpen);
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value);
        setSelectedCategoryId(selectedValue != 0 ? selectedValue : undefined);
        fillProducts();
    };

    useEffect(() => {
    }, [categories]);

    return (
        <div className={'flex justify-between bg-gray-700 text-white p-1'}>
            <h2 className={'font-bold text-xl'}>Produits</h2>
            <div className={'flex w-2/3 justify-end gap-2 items-center'}>
                <h2 className={'font-bold text-l'}>Catégorie</h2>
                <select className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-1/2'}
                        defaultValue="1"
                        data-testid='select-cat'
                        onChange={handleCategoryChange}>
                    <option value={'0'}>Aucune séléction</option>
                    {categories.map((category, index) => {
                        return <option data-testid={`cat-${index}`} key={index} value={category.category_id}>{category.category_name}</option>
                    })}
                </select>
                <button
                    data-testid='edit-cat'
                    className={'bg-blue-500 text-white text-sm px-3 py-1 rounded'}
                    onClick={toggleCategoryModal}
                >
                    ✏️
                </button>
                <button
                    data-testid='edit-cat'
                    className={`${notifications.length > 0 ? 'bg-red-200' : 'bg-green-200'} text-white text-sm px-3 py-1 rounded`}
                    onClick={toggleNotifModal}
                >
                    🔔
                </button>
            </div>
            {isModalCategoryOpen && <CategoryModal close={toggleCategoryModal}/>}
            {isModalNotifOpen && <NotificationModal close={toggleNotifModal}/>}
        </div>
    );
};

export default TableTop;
