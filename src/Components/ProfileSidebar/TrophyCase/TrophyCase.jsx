import style from "./TrophyCase.module.css";
import { useSelector } from "react-redux";
export const TrophyCase = () => {
  const { isLight } = useSelector((state) => state.color);
  return (
    <div
      className={style.TrophyCaseContainer}
      style={
        isLight
          ? { backgroundColor: "#fff", color: "#1a1a1b" }
          : { backgroundColor: "#1a1a1b", color: "#c8cbcd" }
      }
    >
      <span className={style.heading}>Trophy Case (2)</span>
      <div className={style.verified}>
        <img
          src="https://www.redditstatic.com/awards2/3_year_club-40.png"
          alt=""
        />
        <span>Three-Year Club</span>
      </div>
      <div className={style.verified}>
        <img
          src="https://www.redditstatic.com/awards2/verified_email-40.png"
          alt=""
        />
        <span>Verified Email</span>
      </div>
    </div>
  );
};
