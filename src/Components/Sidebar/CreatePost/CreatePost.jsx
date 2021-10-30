import style from "./CreatePost.module.css";
import { useSelector } from "react-redux";

export const CreatePost = () => {
  const { isLight } = useSelector((state) => state.color);
  return (
    <>
      <div className={style.createpostContainer}>
        <div className={style.imageContainer}>
          <div
            className={style.createPostBgWhite}
            style={{
              backgroundColor: isLight ? "#fff" : "#1a1a1b",
              border: `1px solid ${isLight ? "#ccc" : "#343536"}`,
              color: isLight ? "#1c1c1c" : "#d7dadc",
            }}
          >
            <div className={style.createPostImageLeftAlign}>
              <img
                className={style.movingImageTop}
                src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"
                alt="abc"
              />
              <span className={style.homeText}>Home</span>
            </div>
            <div className={style.CreatePostPara}>
              <p>
                Your personal Reddit frontpage. Come here to check in with your favorite
                communities.
              </p>
              <div className={style.buttonContainer}>
                <button className={style.primaryButton}>Create Post</button>
              </div>
              <div className={style.buttonContainer}>
                <button className={style.secondaryButton}>Create Community</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
