import React from "react";
import styles from "../../styles/Post.module.css";

function UserCaption({ caption }) {
  return (
    <div className={styles.postCaption}>
      {caption}
      {/* <a href={link}>{linkDisplay}</a> */}
    </div>
  );
}

export default UserCaption;
