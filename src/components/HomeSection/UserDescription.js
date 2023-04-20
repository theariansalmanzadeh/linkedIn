import React from "react";

import { BsThreeDots } from "react-icons/bs";

import styles from "../../styles/Post.module.css";

function UserDescription({ photo, author, time }) {
  return (
    <div className={styles.author}>
      <img src={photo} alt="" />
      <div className={styles.roles}>
        <h5 className={styles.Userauthor}>{author}</h5>

        <h6 className={styles.releasedTime}>{`${time
          .toDate()
          .toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}`}</h6>
      </div>
      <div className={styles.dots}>
        <BsThreeDots />
      </div>
    </div>
  );
}

export default UserDescription;
