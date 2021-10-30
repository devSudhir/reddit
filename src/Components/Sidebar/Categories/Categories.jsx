import style from "./Categories.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { useSelector } from "react-redux";
export const Categories = () => {
  const [openSelect, setOpenSelect] = useState(true);
  const { isLight } = useSelector((state) => state.color);
  const handleSetOpen = () => {
    setOpenSelect(!openSelect);
  };
  const arr = [
    "POPULAR COMMUNITIES",
    "GAMING",
    "SPORTS",
    "TV",
    "TRAVEL",
    "HEALTH & FITNESS",
    "FASHION",
  ];

  return (
    <div
      className={style.categoryContainer}
      style={
        isLight
          ? { backgroundColor: "#fff", color: "#1a1a1b" }
          : { backgroundColor: "#1a1a1b", color: "#c8cbcd" }
      }
    >
      {arr.map((ele, index) => (
        <div key={index} className={style.buttonStyling}>
          <span>{ele}</span>
          {openSelect ? (
            <button onClick={handleSetOpen}>
              <IoIosArrowDown />
            </button>
          ) : (
            <button onClick={handleSetOpen}>
              <IoIosArrowUp />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
