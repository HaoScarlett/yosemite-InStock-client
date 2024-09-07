import "./InventoryItemErrorState.scss"
import ErrorLogo from "../../assets/icons/error-24px.svg"

function InventoryItemErrorState() {
  return (
    <div className="error-container">
      <img src={ErrorLogo} alt="Red error exclamation mark" />
      <p className="error-container__message p3-body-small">Required field.</p>
    </div>
  );
}

export default InventoryItemErrorState;