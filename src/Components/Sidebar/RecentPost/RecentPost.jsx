import { useState } from "react";
import style from "./RecentPost.module.css";
import { useSelector } from "react-redux";

export const RecentPost = () => {
  const { isLight } = useSelector((state) => state.color);
  const handleClearContainer = () => {
    setDisplayRecentPostContainer(false);
  };
  const [displayRecentPostContainer, setDisplayRecentPostContainer] = useState(true);
  return displayRecentPostContainer ? (
    <div
      className={style.RecentPostContainer}
      style={{
        backgroundColor: isLight ? "#fff" : "#1a1a1b",
        border: `1px solid ${isLight ? "#ccc" : "#343536"}`,
        color: isLight ? "#1c1c1c" : "#d7dadc",
      }}
    >
      <div>
        <p className={`${style.textAlignLeft} ${style.recentpostHeading}`}>RECENT POSTS</p>
      </div>
      <div className={style.displayFlexRecentPostContent}>
        <div className={style.imageContainer}>
          <img
            className={style.image}
            src="https://images.unsplash.com/photo-1632151023539-a7b0766d4178?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8Sjl5clBhSFhSUVl8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div>
          <p className={style.recentPostTitle}>
            I've made the Reddit navbar in REACT. Are you interested to see a tutorial on that?
          </p>
          <div className={style.recentSubTitle}>
            <span>•96 points</span>
            <span>•21 comments</span>
            <span>•18h</span>
          </div>
        </div>
      </div>
      <div className={style.rightButtonBox}>
        <button className={style.buttonAlignRight} onClick={handleClearContainer}>
          clear
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};
