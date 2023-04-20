import React from "react";
import styles from "../../styles/Post.module.css";

function UserPost({ postImage }) {
  return (
    <div className={styles.postImg}>
      <img src={postImage} alt="" />
    </div>
  );
}

export default UserPost;
