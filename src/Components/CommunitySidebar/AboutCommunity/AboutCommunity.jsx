import { BsCardText } from "react-icons/bs";
import style from "./AboutCommunity.module.css";
import { useSelector } from "react-redux";
export const AboutCommunity = () => {
  const { isLight } = useSelector((state) => state.color);
  return (
    <div
      className={style.aboutCommunityContainer}
      style={
        isLight
          ? { backgroundColor: "#fff", color: "#1a1a1b" }
          : { backgroundColor: "#1a1a1b", color: "#c8cbcd" }
      }
    >
      <div
        className={style.blueBackGround}
        style={
          isLight
            ? { color: "#fff" }
            : { backgroundColor: "#1a1a1b", color: "#c8cbcd" }
        }
      >
        <span>About Community</span>
      </div>
      <div className={`${style.padding10}`}>
        <p>This subreddit is for unexpected twists in videos and gifs</p>
      </div>
      <div className={`${style.padding10} ${style.countDown}`}>
        <div>
          <span className={style.boldHeading}>4.7m </span>
          <br />
          <span className={style.subHeading}>Members</span>
        </div>
        <div>
          <span className={style.boldHeading}>32.2k </span>
          <br />
          <span className={style.subHeading}>Online</span>
        </div>
      </div>
      <div className={`${style.padding10} ${style.createdDate}`}>
        <BsCardText />
        <span>Created Jan 27, 2013</span>
      </div>
    </div>
  );
};
