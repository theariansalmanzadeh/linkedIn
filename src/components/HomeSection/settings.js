import React from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import EditSettings from "./EditSettings.js";
import Backdrop from "../UI/Backdrop.js";
import { cartActions } from "../../store/Cart.js";

function Settings() {
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(cartActions.toggleSetting(false));
  };
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <EditSettings />,
        document.getElementById("Edit-profile")
      )}
      {ReactDOM.createPortal(
        <Backdrop onClose={closeHandler} />,
        document.getElementById("Edit-profile")
      )}
    </React.Fragment>
  );
}

export default Settings;
