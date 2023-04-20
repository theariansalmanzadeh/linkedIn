import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/Cart";

import NewPost from "../HomeSection/NewPost";
import Backdrop from "./Backdrop";

function NewPostModal({ CloseModalhandler }) {
  return (
    <div>
      {ReactDOM.createPortal(
        <NewPost onClose={CloseModalhandler} />,
        document.getElementById("newPost")
      )}
      {ReactDOM.createPortal(
        <Backdrop onClose={CloseModalhandler} />,
        document.getElementById("newPost")
      )}
    </div>
  );
}

export default NewPostModal;
