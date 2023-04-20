import React from "react";

import styles from "../../styles/RightSide.module.css";
import styled from "styled-components";

import TagImg from "../../images/feed-icon.svg";

import RightArrow from "../../images/right-icon.svg";

function Tags() {
  return (
    <div className={styles.Tag}>
      <div className={styles.TagHeader}>
        <p>Add to your Tags</p>
        <img src={TagImg} alt="" />
      </div>
      <div className={styles.followTags}>
        <Avatar />
        <div>
          <p>#LinkedIn</p>
          <button>Follow</button>
        </div>
      </div>
      <div className={styles.followTags}>
        <Avatar />
        <div>
          <p>#LinkedIn</p>
          <button>Follow</button>
        </div>
      </div>
      <a href="">
        view all recommendations <img src={RightArrow} alt="" />
      </a>
    </div>
  );
}

export default Tags;

const Avatar = styled.div`
background-image=url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrcmcyxzoidwxms");
`;
