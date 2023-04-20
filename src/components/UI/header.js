import React from "react";

import logo from "../../images/linkedin.png";
import searchLogo from "../../images/search-icon.svg";

import styles from "../../styles/header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt="" />
      <div className={styles.searchHeader}>
        <img src={searchLogo} alt="" />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default Header;
