import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/Cart";

import styles from "styled-components";
import classes from "../../styles/profile.module.css";

function ProfileWriting(props) {
  const dispatch = useDispatch();
  const birthDate = useSelector((state) => state.cart.birthDate);

  return (
    <div className={classes.ProfileDetalis}>
      <p className={classes.writings}>
        <span>welcome,</span> {props.name}
      </p>
      <p className={classes.writingsEmail}>{props.email}</p>
      {<p>Birth : {birthDate}</p>}
      <Link
        to="#"
        className={classes.EditProfile}
        onClick={() => {
          dispatch(cartActions.toggleEditProfile(true));
        }}
      >
        Edit Profile
      </Link>
    </div>
  );
}

export default ProfileWriting;
