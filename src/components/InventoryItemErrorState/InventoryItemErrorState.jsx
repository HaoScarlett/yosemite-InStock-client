import React from "react";
import "./InventoryItemErrorState.scss";
import ErrorIcon from "../../assets/icons/error-24px.svg";


function InventoryItemErrorState() {
  return (
    <div className="error-container">
      <img src={ErrorIcon} alt="exclamation mark" />
      <p className="error-container__message p3-body-small">This field is required.</p>
    </div>
  );
}

export default InventoryItemErrorState;
