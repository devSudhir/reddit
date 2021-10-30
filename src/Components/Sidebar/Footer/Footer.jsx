import style from "./Footer.module.css";
import { useSelector } from "react-redux";

export const Footer = () => {
  const { isLight } = useSelector((state) => state.color);
  return (
    <div
      className={style.footerContainer}
      style={{
        backgroundColor: isLight ? "#fff" : "#1a1a1b",
        border: `1px solid ${isLight ? "#ccc" : "#343536"}`,
        color: isLight ? "#1c1c1c" : "#d7dadc",
      }}
    >
      <div className={style.footerFlex}>
        <div>
          <p>Help</p> <p>Reddit Coins</p> <p>Reddit Premium</p> <p>Reddit Gifts</p>{" "}
          <p>Communities</p> <p>Rereddit</p>
          Topics
        </div>
        <div>
          <p>About</p> <p>Careers</p> <p>Press</p> <p>Advertise</p> <p>Blog</p> <p>Terms</p>{" "}
          <p>Content Policy</p> <p>Privacy Policy</p>
          <p>Mod Policy</p>
        </div>
      </div>
      <div className={style.copyright}>Reddit Inc © 2021 . All rights reserved</div>
    </div>
  );
};
