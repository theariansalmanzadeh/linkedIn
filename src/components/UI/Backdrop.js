import React from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/Cart";

import styles from "styled-components";

function Backdrop(props) {
  const dispatch = useDispatch();
  return (
    <BackdropModal
      onClick={() => {
        props.onClose();
      }}
    ></BackdropModal>
  );
}

const BackdropModal = styles.div`
width:100%;
height:100vh;
background-color:rgba(0,0,0,0.7);
position:fixed;
z-index: 100;


`;

export default Backdrop;
