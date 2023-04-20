import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/Cart";
import PostAuthor from "./postAuthor";
import PostCaption from "./postCaption";
import PostImg from "./postImg";
import PostComments from "./PostComments";
import styles from "../../styles/Post.module.css";

const timeConverting = (date) => {
  const time = new Date(date);
  return time.toLocaleDateString("us-en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

function CommiunityPosts() {
  const [posts, setposts] = useState(null);

  const dispatch = useDispatch();

  if (posts === null) return;
}

export default CommiunityPosts;
