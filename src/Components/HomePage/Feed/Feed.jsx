import { FeedItem } from "./FeedItem";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IoFlame, IoReorderFourSharp } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { CgArrowUpR } from "react-icons/cg";
import { BsThreeDots, BsLayoutThreeColumns } from "react-icons/bs";
import { RiArrowDownSLine, RiLayoutRowLine } from "react-icons/ri";
import { useState } from "react";
import { CreatePost } from "./CreatePost";

function Feed({ community = false, data, userPage = false }) {
  const { isLight } = useSelector((state) => state.color);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const handleClick = (n = 1) => {
    if (n === 1) setValue(1);
    if (n === 2) setValue(2);
    if (n === 3) setValue(3);
    setOpen((pre) => !pre);
  };

  // const handleClickAway = () => {
  //   console.log("hh");
  //   setOpen(false);
  // };
  console.log("feed", data);
  return (
    <Con isLight={isLight}>
      <div className="menu">
        {!userPage && <CreatePost />}
        <div>Popular Post</div>
        <div className="menuItem">
          <div className="icon firstIcon">
            <div>
              <IoFlame />
            </div>
            <div>Hot</div>
          </div>
          <div className="icon">
            <div>
              <AiOutlineStar />
            </div>
            <div>New</div>
          </div>
          <div className="icon">
            <div>
              <CgArrowUpR />
            </div>
            <div>Top</div>
          </div>
          <div className="icon">
            <div>
              <BsThreeDots />
            </div>
          </div>
          <div className="last">
            <div className="icon" onClick={handleClick}>
              <div>
                {value === 1 ? (
                  <RiLayoutRowLine />
                ) : value === 2 ? (
                  <BsLayoutThreeColumns className="rotate" />
                ) : (
                  <IoReorderFourSharp />
                )}
              </div>
              <div>
                <RiArrowDownSLine />
              </div>
            </div>
            {open && (
              <div className="hidden">
                <div
                  className="icon"
                  onClick={() => {
                    handleClick(1);
                  }}
                >
                  <div className="iconDiv">
                    <RiLayoutRowLine />
                  </div>
                  <div>Card</div>
                </div>

                <div
                  className="icon"
                  onClick={() => {
                    handleClick(2);
                  }}
                >
                  <div className="iconDiv">
                    <BsLayoutThreeColumns className="rotate" />
                  </div>
                  <div>Classic</div>
                </div>

                <div
                  className="icon"
                  onClick={() => {
                    handleClick(3);
                  }}
                  style={{ borderBottom: "none" }}
                >
                  <div className="iconDiv">
                    <IoReorderFourSharp />
                  </div>
                  <div>Compact</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {data.map((a) => (
        <FeedItem community={community} type={value} data={a} key={a._id} />
      ))}
    </Con>
  );
}

const Con = styled.div`
  width: 640px;
  box-sizing: border-box;

  .menu > div:nth-child(1) {
    text-align: left;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: ${(props) => (props.isLight ? " #1a1a1b;" : "#d7dadc")};
  }

  .menuItem {
    box-sizing: border-box;
    background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
    border-radius: 4px;
    border: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")};
    display: flex;
    width: 640px;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 16px;
    margin-top: 8px;
    padding: 10px 12px;

    .firstIcon {
      color: rgb(2, 114, 196) !important;
    }
    .firstIcon svg {
      fill: rgb(2, 114, 196) !important;
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      word-break: normal;
      color: #818384;
      font-weight: 600;
      font-size: 16px;
      border-radius: 22px;
      cursor: pointer;
      margin-right: 5px;

      .rotate {
        transform: rotate(90deg);
      }
    }
    .icon svg {
      fill: #818384;
    }
    .icon:hover {
      background: ${(props) => (props.isLight ? "rgb(237, 237, 237)" : "rgba(215, 218, 220, 0.1)")};
    }
    .icon > div:nth-child(1) {
      font-size: 23px;
      font-weight: 400;
      height: 22px;
      line-height: 20px;
      vertical-align: middle;
      width: 20px;
      margin-right: 7px;
    }
    .icon > div {
      margin-right: 8px;
    }
    .last {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
      position: relative;
      .icon > div:nth-child(1) {
        font-size: 25px !important;
        height: 28px;
        width: 25px;
      }

      .icon > div:nth-child(2) {
        font-size: 19px;
        height: 18px;
        margin-top: 0px;
      }
    }
  }

  .hidden {
    width: 125px;
    height: max-content;
    position: absolute;
    top: 40px;
    right: -41px;
    border: 1px solid ${(props) => (props.isLight ? "#edeff1" : "#343536")};

    box-shadow: 0 2px 4px 0
      ${(props) => (props.isLight ? "rgba(28, 28, 28, 0.2)" : "rgba(215,218,220,0.2)")};
    color: ${(props) => (props.isLight ? " #1c1c1c" : "#d7dadc")};
    overflow: hidden;
    background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
    position: absolute;
    z-index: 10;

    & > div {
      display: flex;
      align-items: center;
      justify-content: flex-start !important;
      border-bottom: 1px solid ${(props) => (props.isLight ? "#edeff1" : "#343536")};
      border-radius: 0px !important;
      margin-bottom: 5px;
      padding: 15px 8px !important;
    }
    & .iconDiv {
      height: 20px !important;
    }

    div:hover {
      background: none;
    }
  }
`;
export { Feed };
