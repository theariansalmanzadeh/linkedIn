import React from "react";

import Plus from "../../images/plus-icon.svg";

import styles from "../../styles/commiunities.module.css";

function Commiunities() {
  return (
    <div className={styles.commiunities}>
      <div className={styles.Activities}>
        <div>
          <p>Groups</p>
          <p>Events</p>
        </div>
        <button>
          <img src={Plus} alt="" />
        </button>
      </div>
      <button className={styles.Discover}>Discover more</button>
    </div>
  );
}

export default Commiunities;
