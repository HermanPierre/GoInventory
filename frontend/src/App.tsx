import React, {useEffect, useState} from 'react';
import './App.css';
import InventoryTable from "./components/inventory-table/inventory-table";
import useGoInventoryStore from "./stores/products.store";
import keycloak from "./keycloak";

function App() {
    const {fillProducts, fillCategories} = useGoInventoryStore((state) => state);
    const [authentified, setAuthentified] = useState(false)

    useEffect(() => {
        const auth = keycloak.authenticated
        keycloak.init({checkLoginIframe: false, onLoad: 'login-required'}).then((authenticated) => {
            console.log(authenticated)
            if (authenticated) {
                setAuthentified(true)
                fillProducts();
                fillCategories();
            } else {
                setAuthentified(false)
                keycloak.login();
            }
        })
    }, []);

    return (
        <>
            {authentified &&
                <div className={'h-screen bg-gray-50 flex flex-col'}>
                    <div className={'flex justify-center'}>
                        <h2 className={'text-4xl font-bold'}>GoInventory™</h2>
                    </div>
                    <InventoryTable/>
                </div>
            }
        </>
    );
}

export default App;
