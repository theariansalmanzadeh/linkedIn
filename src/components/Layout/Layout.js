import React from "react";
import { useSelector } from "react-redux";
import Header from "../UI/header";
import Navbar from "../UI/Navbar";
import HireComment from "../UI/HireComment";
import Home from "./Home";
import Settings from "../HomeSection/settings";
import styles from "../../styles/Nav.module.css";

function Layout() {
  const isSetting = useSelector((state) => state.cart.isSetting);
  const mode = useSelector((state) => state.cart.UImode);

  const classes =
    mode === "light" ? `${styles.nav}` : `${styles.nav} ${styles.darkMode}`;

  return (
    <React.Fragment>
      <div className={classes}>
        {isSetting && <Settings />}
        <Header />
        <Navbar mode={mode} />
      </div>
      <HireComment />
      <Home />
    </React.Fragment>
  );
}

export default Layout;
