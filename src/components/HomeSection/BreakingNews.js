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

function BreakingNews() {
  const [news, setNews] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(cartActions.toggleIsLoading(true));
      const res = await fetch(
        `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=GhEBtGTWqqtI3m1bxPHMjDbXKaG4Sk1a`
      );

      const data = await res.json();

      setNews(data.results.slice(0, 5));
      console.log(data);
      dispatch(cartActions.toggleIsLoading(false));
    })();
  }, [dispatch]);

  if (news === null) return;

  return (
    <React.Fragment>
      {news.map((post, indx) => (
        <li key={indx} className={styles.listItem}>
          <div className={styles.Post}>
            <PostAuthor
              subHeading={post.item_type}
              athor={post.des_facet[0]}
              time={timeConverting(post.published_date)}
            />
            <PostCaption caption={post.abstract} link={post.url} />
            <PostImg postImage={post.multimedia[1].url} />
            <PostComments />
          </div>
        </li>
      ))}
    </React.Fragment>
  );
}

export default BreakingNews;
