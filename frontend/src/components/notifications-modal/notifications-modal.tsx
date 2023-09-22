import React from "react";
import useGoInventoryStore from "../../stores/products.store";

interface NotificationModalType {
    close: () => void;
}
function NotificationModal({ close }: NotificationModalType) {
    const { notifications } = useGoInventoryStore((state) => state);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-lg w-1/2 text-gray-950">
                <h2 className="text-lg font-semibold mb-4 text-gray-950">Liste des Notifications</h2>
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index} className="mb-2">
                            {notification}
                        </li>
                    ))}
                </ul>
                {notifications.length === 0 && <p>Aucune notifications...</p>}
                <button
                    data-testid="close-modal"
                    onClick={close}
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                >
                    Fermer la modal
                </button>
            </div>
        </div>
    );
}

export default NotificationModal;
