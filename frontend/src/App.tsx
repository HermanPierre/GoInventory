import React, {useEffect} from 'react';
import './App.css';
import InventoryTable from "./components/inventory-table/inventory-table";
import useGoInventoryStore from "./stores/products.store";

function App() {
    const {fillProducts, fillCategories} = useGoInventoryStore((state) => state);


    useEffect(() => {
        fillProducts();
        fillCategories();
    }, [])

    return (
        <div className={'h-screen bg-gray-50 flex flex-col'}>
            <div className={'flex justify-center'}>
                <h2 className={'text-4xl font-bold'}>GoInventory™</h2>
            </div>
            <InventoryTable/>
        </div>
    );
}

export default App;
