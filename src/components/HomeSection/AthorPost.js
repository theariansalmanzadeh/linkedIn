import React from "react";
import { useSelector } from "react-redux";
import UserDescription from "./UserDescription.js";
import UserCaption from "./UserCaption.js";
import UserPost from "./UserPost.js";
import PostComments from "./PostComments";
import styles from "../../styles/Post.module.css";

function AthorPost() {
  const data = useSelector((state) => state.cart.articles);
  return (
    // <ul className={styles.listPosts}>
    <React.Fragment>
      {data.map((post, indx) => {
        return (
          <li key={indx} className={styles.listItem}>
            <div className={styles.Post}>
              <UserDescription {...post.actor.userDetails} />
              <UserCaption caption={post.actor.description} />
              <UserPost postImage={post.actor.imagePosted} />
              <PostComments />
            </div>
          </li>
        );
      })}
    </React.Fragment>
    // </ul>
  );
}

export default AthorPost;
