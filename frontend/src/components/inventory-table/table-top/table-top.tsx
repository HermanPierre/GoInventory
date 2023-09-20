import React from 'react';

const TableTop = () => {
    return (
        <div className={'flex justify-between bg-gray-700 text-white p-1'}>
            <h2 className={'font-bold text-xl'}>Produits</h2>
            <div className={'flex w-1/2 justify-end gap-2 items-center'}>
                <h2 className={'font-bold text-l'}>Catégorie</h2>
                <select className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-1/2'}
                        defaultValue="1">
                    <option value="1">Cat 1</option>
                    <option value="2">Cat 2</option>
                </select>
            </div>
        </div>
    );
};

export default TableTop;
