import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/signIn.module.css";

function SignIn() {
  return (
    <div className={styles.signIn}>
      <h4 className={styles.title}>LinkedIn</h4>
      <form className={styles.form}>
        <input placeholder="Email" type="email" />
        <input placeholder="Password" type="text" />
        <div className={styles.btnWrapper}>
          <button>Sign in</button>
          <Link to="/newpassword">forgot your password?</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
