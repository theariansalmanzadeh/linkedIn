import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/Cart";

import styles from "../../styles/AddPost.module.css";
import { BiPhotoAlbum, BiVideoPlus, BiCalendarPlus } from "react-icons/bi";
import { BsPaperclip } from "react-icons/bs";

import ProfileImg from "./../../images/user.svg";

function AddPost() {
  const dispatch = useDispatch();
  const userPhoto = useSelector((state) => state.logIn.userInfo.photoURL);
  const userData = useSelector((state) => state.logIn.userInfo);
  const auth = useSelector((state) => state.logIn.auth);

  const MediaHandler = (e) => {
    if (!e.target.classList.contains("media-btn")) return;
    console.log(e.target.innerHTML.slice(-5));
    dispatch(cartActions.toggleNewPost(true));

    dispatch(cartActions.setMediaRef(e.target.innerHTML.slice(-5)));
  };

  return (
    <div className={styles.AddPost}>
      <div className={styles.PostInput}>
        {auth !== "" && (userPhoto || userData.photoUrl) ? (
          <img src={userPhoto || userData.photoUrl} alt="" />
        ) : (
          <img src={ProfileImg} alt="" />
        )}

        <button
          onClick={() => {
            dispatch(cartActions.toggleNewPost(true));
            dispatch(cartActions.setMediaRef(null));
          }}
        >
          Start a Post
        </button>
      </div>
      <div onClick={MediaHandler} className={styles.MediaInput}>
        <button className="media-btn">
          <BiPhotoAlbum style={{ fill: "#f6c57d" }} className={styles.icon} />{" "}
          <p>Photo</p>
        </button>

        <button className="media-btn">
          <BiVideoPlus className={styles.icon} />
          <p>Video</p>
        </button>
        <button className="">
          <BiCalendarPlus style={{ fill: "#4ce460" }} className={styles.icon} />
          <p>Event</p>
        </button>
        <button className="">
          <BsPaperclip className={styles.icon} />
          <p>Write Article</p>
        </button>
      </div>
    </div>
  );
}

export default AddPost;
