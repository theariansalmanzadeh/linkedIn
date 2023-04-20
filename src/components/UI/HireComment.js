import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/HireComment.module.css";

function HireComment() {
  const mode = useSelector((state) => state.cart.UImode);

  const classes =
    mode === "light"
      ? `${styles.hireComment}`
      : `${styles.hireComment} ${styles.darkMode}`;
  return (
    <div className={classes}>
      <a href="#home" target="_blank">
        Hire in hurry?
      </a>{" "}
      HireComment
    </div>
  );
}

export default HireComment;
