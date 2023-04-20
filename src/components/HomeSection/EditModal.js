import React from "react";
import ReactDOM from "react-dom";
import EditProfile from "../UI/EditProfile";
import Backdrop from "../UI/Backdrop";

function EditModal() {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <EditProfile />,
        document.getElementById("Edit-profile")
      )}
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("Edit-profile")
      )}
    </React.Fragment>
  );
}

export default EditModal;
