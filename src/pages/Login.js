import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "../styles/Login.module.css";
import imgLogin from "../images/login-hero.svg";
import Nav from "../components/logins/Nav";
import GoogleBtn from "../components/logins/GoogleBtn";

function Login() {
  const auth = useSelector((state) => state.logIn.auth);
  console.log(auth);
  const history = useHistory();

  if (auth !== "") {
    history.push("/home");
  }

  return (
    <div className={classes.Login}>
      <Nav />

      <section className={classes.LoginSection}>
        <div>
          <p>welcome to your professional Community</p>
          <GoogleBtn />
        </div>
        <div>
          <img src={imgLogin} className={classes.imgLogin} alt="" />
        </div>
      </section>
    </div>
  );
}

export default Login;
