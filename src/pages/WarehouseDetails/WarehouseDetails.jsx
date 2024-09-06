import React from "react";
import Warehouse from "../../components/Warehouse/Warehouse";
function WarehouseDetails() {
    const { id } = useParams(); 
    const [currentView, setCurrentView] = useState('details');

    const handleEdit = () => setCurrentView('edit');
    const handleCancel = () => setCurrentView('details'); 

    return ( 
    <div>
    {currentView === 'details' && (
    <>
        <Warehouse id={id} />
        <button onClick={handleEdit}>Edit Warehouse</button>
    </>
    )}

    {/* {currentView === 'edit' && (
    <EditWarehouse id={id} onCancel={handleCancel} />
    )} */}
    </div>
)
}

export default WarehouseDetails;