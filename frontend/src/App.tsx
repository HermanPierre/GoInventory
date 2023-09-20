import React from 'react';
import './App.css';
import InventoryTable from "./components/inventory-table/inventory-table";

function App() {
    return (
        <div className={'h-screen bg-gray-50 flex flex-col'}>
            <div className={'flex justify-center'}>
                <h2 className={'text-4xl font-bold'}>GoInventory™</h2>
            </div>
            <div className={'flex-1 flex justify-center items-center'}>
                <InventoryTable/>
            </div>
        </div>
    );
}

export default App;
