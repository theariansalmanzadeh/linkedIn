import React from "react";

import { BsThreeDots } from "react-icons/bs";

import styles from "../../styles/Post.module.css";

import newsProfile from "../../images/news.jpg";

function postAuthor({ athor, profileImg, subHeading, time }) {
  return (
    <div className={styles.author}>
      {profileImg != null ? (
        <img src={profileImg} alt="" />
      ) : (
        <img src={newsProfile} alt="" />
      )}
      <div className={styles.roles}>
        <h5>{athor}</h5>
        <h6>{subHeading}</h6>
        <h6 className={styles.releasedTime}>{time}</h6>
      </div>
      <div className={styles.dots}>
        <BsThreeDots />
      </div>
    </div>
  );
}

export default postAuthor;
