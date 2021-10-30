import style from "./FilterFlair.module.css";
import { useSelector } from "react-redux";
export const FilterFlair = () => {
  const { isLight } = useSelector((state) => state.color);
  const filterArray = [
    "abc",
    "cdefghi",
    "jkklskdia",
    "ldhfheoo",
    "mlaigdhainh",
    "ohsiuhfidwfnsh",
  ];
  return (
    <div
      className={style.filterFlairContainer}
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
        <span>Filter By Flair</span>
      </div>
      <div className={style.buttonBox}>
        {filterArray.map((ele, index) => {
          return (
            <button className={style.buttons} key={index + 1}>
              {ele}
            </button>
          );
        })}
      </div>
    </div>
  );
};
