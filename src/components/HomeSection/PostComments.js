import React from "react";

import {
  BiLike,
  BiCommentDetail,
  BiComment,
  BiRepost,
  BiShareAlt,
} from "react-icons/bi";

import styles from "../../styles/.PostCommnets.module.css";

function PostComments() {
  return (
    <div>
      <div className={styles.postViewed}>
        <div>
          <BiLike style={{ fontSize: "1.2rem" }} />
          <BiCommentDetail style={{ fontSize: "1.2rem" }} />
          {0}liked
        </div>
        <p>{0}comments</p>
      </div>
      <div className={styles.postInteraction}>
        <button>
          <BiLike />
          Like
        </button>
        <button>
          <BiComment />
          Comment
        </button>
        <button>
          <BiRepost />
          Repost
        </button>
        <button>
          <BiShareAlt />
          Share
        </button>
      </div>
    </div>
  );
}

export default PostComments;
