import React from "react";

// import PostImage from "../../images/img1.jpg";

import styles from "../../styles/Post.module.css";

function postImg({ postImage }) {
  return (
    <div className={styles.postImg}>
      <img src={postImage} alt="" />
    </div>
  );
}

export default postImg;
