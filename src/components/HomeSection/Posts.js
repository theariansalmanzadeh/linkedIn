import React from "react";

import styles from "../../styles/Post.module.css";

import PostAuthor from "./postAuthor";
import PostCaption from "./postCaption";
import PostImg from "./postImg";
import PostComments from "./PostComments";

const defaultData = [
  {
    athor: "LinkedIn",
    ind: 1,
    time: "1w",
    subHeading: "world wide",
    caption: "95+ NEW LinkedIn Features for 2022",
    postImage: "./images/newLinkedIn.png",
    profileImg: "./images/linkedin.png",
  },
  {
    athor: "LinkedIn",
    time: "1w",
    ind: 2,
    subHeading: "world wide",
    caption: `Why, How and When Should I Be Active on LinkedIn? \n read more in`,
    link: "https://www.business2community.com/linkedin/active-linkedin-science-strategy-behind-content-sharing-02020933",
    postImage: "./images/LinkedInPostpng.png",
    profileImg: "./images/linkedin.png",
  },
];

function DefaultPosts() {
  return (
    <React.Fragment>
      {defaultData.map((post) => (
        <li key={post.ind} className={styles.listItem}>
          <div className={styles.Post}>
            <PostAuthor {...post} />
            <PostCaption {...post} />
            <PostImg postImage={post.postImage} />
            <PostComments />
          </div>
        </li>
      ))}
    </React.Fragment>
  );
}

export default DefaultPosts;
