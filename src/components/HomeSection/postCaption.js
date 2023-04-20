import React from "react";

import styles from "../../styles/Post.module.css";

function postCaption({ caption, link }) {
  const linkDisplay = String(link).slice(0, 4 + String(link).search(".com"));

  return (
    <div className={styles.postCaption}>
      {caption}
      <a href={link}>{linkDisplay}</a>
    </div>
  );
}

export default postCaption;
