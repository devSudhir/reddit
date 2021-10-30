import { GiCheckedShield } from "react-icons/gi";
import style from "./RedditPremium.module.css";
import { useSelector } from "react-redux";
export const RedditPremium = () => {
  const { isLight } = useSelector((state) => state.color);
  return (
    <div
      className={style.premiumBox}
      style={{
        backgroundColor: isLight ? "#fff" : "#1a1a1b",
        border: `1px solid ${isLight ? "#ccc" : "#343536"}`,
        color: isLight ? "#1c1c1c" : "#d7dadc",
      }}
    >
      <div className={style.flexPremium}>
        <div>
          <GiCheckedShield style={{ color: "#FF5414" }} size={30} />
        </div>

        <div className={style.premiumParaBox}>
          <p>Reddit Premium</p>
          <p>The best Reddit experience, with monthly Coins</p>
        </div>
      </div>
      <div className={style.primaryOrangeButtonContainer}>
        <button className={style.primaryOrangeButton}>Try Now</button>
      </div>
    </div>
  );
};
