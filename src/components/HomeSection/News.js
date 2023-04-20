import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions, fetchDataAPI, fetchDataAPIOwner } from "../../store/Cart";
import { ImSpinner6 } from "react-icons/im";
import styles from "../../styles/centerSection.module.css";
import AddPost from "./AddPost";
import AthorPost from "./AthorPost.js";
import BreakingNews from "./BreakingNews.js";
import DefaultPosts from "./Posts";
import NewPostModal from "../UI/NewPostModal";
import CommiunityPosts from "./CommiunityPosts";

function News() {
  const dispatch = useDispatch();
  const NewPost = useSelector((state) => state.cart.NewPost);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const { displayName } = useSelector((state) => state.logIn.userInfo);

  const CloseModalhandler = () => {
    dispatch(cartActions.toggleNewPost(false));
  };

  useEffect(() => {
    dispatch(cartActions.toggleIsLoading(true));
    dispatch(fetchDataAPI(displayName));
    dispatch(fetchDataAPIOwner());
    // dispatch(cartActions.toggleIsLoading(false));
  }, [dispatch, displayName]);

  return (
    <React.Fragment>
      {NewPost && <NewPostModal CloseModalhandler={CloseModalhandler} />}
      <div className={styles.centerSection}>
        <AddPost />
        {isLoading && (
          <div className={styles.loaderWrapper}>
            <ImSpinner6 className={styles.loader} />
          </div>
        )}
        <AthorPost />
        <BreakingNews />
        <CommiunityPosts />
        <DefaultPosts className={styles.Posts} />
      </div>
    </React.Fragment>
  );
}

export default News;
