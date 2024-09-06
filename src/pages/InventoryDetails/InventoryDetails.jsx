import React from "react";
import InventoryItem from "../../components/InventoryItem/InventoryItem";
function InventoryDetails() {
    const { id } = useParams(); 
    const [currentView, setCurrentView] = useState('details');

    const handleEdit = () => setCurrentView('edit');
    const handleCancel = () => setCurrentView('details'); 

    return ( 
    <div>
    {currentView === 'details' && (
    <>
        <InventoryItem id={id} />
        <button onClick={handleEdit}>Edit Warehouse</button>
    </>
    )}

    {/* {currentView === 'edit' && (
    <EditInventory id={id} onCancel={handleCancel} />
    )} */}
    </div>
)
}

export default InventoryDetails;