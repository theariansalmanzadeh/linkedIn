import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Portfolio from "../HomeSection/Portfolio";

import News from "../HomeSection/News";
import Tags from "../HomeSection/Tags";

import styles from "../../styles/mainSection.module.css";

function Home() {
  const mode = useSelector((state) => state.cart.UImode);

  const classes =
    mode === "light"
      ? `${styles.mainSection}`
      : `${styles.mainSection} ${styles.darkMode}`;

  return (
    <section className={classes}>
      <Portfolio />
      <News />
      <Tags />
    </section>
  );
}

export default Home;
