import React, {useEffect} from 'react';
import useGoInventoryStore from "../../../stores/products.store";

const TableTop = () => {
    const {categories, setSelectedCategory, fillStore} = useGoInventoryStore((state) => state);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value);
        const selectedCategory = categories.find(cat => cat.category_id = selectedValue)
        setSelectedCategory(selectedCategory);
        fillStore();
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
                    <option value={undefined}>Aucune séléction</option>
                    {categories.map((category, index) => {
                        return <option key={index} value={category.category_id}>{category.category_name}</option>
                    })}
                </select>
            </div>
        </div>
    );
};

export default TableTop;
