import styled from "styled-components";
import { useSelector } from "react-redux";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CommentsItem({ data }) {
  const { isLight } = useSelector((state) => state.color);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const [vote, setVote] = useState(0);
  const [isVoted, setIsVoted] = useState(0);

  console.log("comment", data);
  const handleRouteUser = () => {
    history.push(`/user/${data.userId._id}`);
  };

  useEffect(() => {
    updateVote();
  }, []);

  // extractin time past
  const currentDate = Date.now();
  const postDate = new Date(data?.createdAt);
  let diff = Math.abs((currentDate - postDate) / (1000 * 60 * 60));
  let days = null;
  let hours = null;
  let mins = null;
  if (diff >= 24) {
    days = Math.floor(diff / 24); // will be in days
  } else if (diff < 1) {
    mins = Math.ceil(diff * 60); // will be in min
  } else {
    hours = Math.ceil(diff); // hours
  }

  function updateVote() {
    voteCount(data._id);
    if (user._id) {
      voteStatus(data._id, user?._id);
    }
  }

  //  gettiing vote count
  async function voteCount(postId) {
    let count = await axios.get(`https://reddit-new.herokuapp.com/votes/count/${postId}`);
    setVote(count.data.count);
    //console.log("count.data", count.data.count);
  }

  // getting vote status
  async function voteStatus(postId, userId) {
    let count = await axios.get(`https://reddit-new.herokuapp.com/votes/check/${postId}/${userId}`);
    setIsVoted(count.data.vote[0]?.value);
  }

  async function voteUp(postId, userId) {
    console.log(1, "up");
    if (isVoted === 1) {
      voteRemove(postId, userId);
      return;
    }
    try {
      let body = {
        userId: userId,
        parentId: postId,
      };
      let up = await axios.post(`https://reddit-new.herokuapp.com/votes/up`, body);
      updateVote();
      setIsVoted(1);
    } catch (e) {
      console.log(e);
    }
  }

  async function voteDown(postId, userId) {
    if (isVoted === -1) {
      voteRemove(postId, userId);
      return;
    }
    try {
      let body = {
        userId: userId,
        parentId: postId,
      };
      let down = await axios.post(`https://reddit-new.herokuapp.com/votes/down`, body);
      updateVote();
      setIsVoted(down);
      console.log("down", down.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function voteRemove(postId, userId) {
    try {
      let body = {
        userId: userId,
        parentId: postId,
      };
      let remove = await axios.post(`https://reddit-new.herokuapp.com/votes/remove`, body);
      updateVote();
      setIsVoted(0);
      console.log("remove", remove.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Com isLight={isLight} isVoted={isVoted}>
      <div className="line"></div>
      <div className="box">
        <div className="upper">
          <div className="profileImg">
            <img src={data?.userId?.profile_url} alt="" />
          </div>
          <div className="text">
            <span
              onClick={() => {
                handleRouteUser();
              }}
            >
              {data?.userId?.name}
            </span>
            <span></span>
            <span>
              {days ? days : hours ? hours : mins}
              {days ? "days" : hours ? "hours" : "mins"} ago
            </span>
          </div>
        </div>
        <div className="title">{data.text}</div>

        <div className="comments">
          <div className="icon">
            <div className="likes">
              <ImArrowUp
                onClick={() => {
                  if (!user._id) {
                    alert("Please login first");
                    return;
                  }
                  voteUp(data._id, user?._id);
                }}
              />
              <div>{vote || 0}</div>
              <ImArrowDown
                onClick={() => {
                  if (!user._id) {
                    alert("Please login first");
                    return;
                  }
                  voteDown(data._id, user?._id);
                }}
              />
            </div>
          </div>
          <div className="icon ">
            <div style={{ fontSize: "22px" }}>
              <FaRegCommentAlt />
            </div>
            <div>Reply</div>
          </div>
          <div className="icon ">
            <div className="withoutIcon">Give Awards</div>
          </div>
          <div className="icon">
            <div className="withoutIcon">Share</div>
          </div>
          <div className="icon">
            <div className="withoutIcon">Share</div>
          </div>
          <div className="icon">
            <div>
              <BsThreeDots />
            </div>
          </div>
        </div>
      </div>
    </Com>
  );
}

const Com = styled.div`
  position: relative;
  width: 640px;
  min-height: 100px;
  box-sizing: border-box;
  background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
  /* border-radius: 4px; */
  /* border: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")}; */
  display: flex;
  /* margin-bottom: 16px; */
  padding: 8px;
  align-items: flex-start;
  justify-content: center;
  /* &:hover {
    border: 1px solid ${(props) => (props.isLight ? "#898989" : "#818384")};
  } */
  .box {
    padding-top: 8px;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    padding-left: 10px;
    .upper {
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin: 0 8px 8px;
      position: relative;
    }
    .profileImg {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 5px;
      /* position: absolute; */
      top: 6px;
      left: 6px;
    }
    .text {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      flex: 1 1 auto;
      overflow: hidden;
      position: relative;
      span {
        margin-right: 5px;
        cursor: pointer;
      }
      span:hover {
        text-decoration: underline;
      }
      span:nth-child(1) {
        font-size: 12px;
        font-weight: 700;
        line-height: 16px;
        color: ${(props) => (props.isLight ? " #1c1c1c" : "#d7dadc")};
        display: inline;
        line-height: 20px;

        vertical-align: baseline;
      }
      span:nth-child(n + 2) {
        color: #787c7e;
      }
    }
    .join {
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${(props) => (props.isLight ? "#0079d3" : "#d7dadc")};
      color: ${(props) => (props.isLight ? "#ffffff" : "#1a1a1b")};
      fill: ${(props) => (props.isLight ? "#ffffff" : "#1a1a1b")};

      font-size: 14px;
      font-weight: 700;
      letter-spacing: unset;
      line-height: 16px;
      text-transform: unset;
      min-height: 24px;
      min-width: 24px;
      padding: 4px 4px;
      padding-right: 10px;
      box-sizing: border-box;
      border-radius: 20px;
      cursor: pointer;
      svg {
        width: 25px;
        height: 25px;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .title {
      font-family: Noto Sans, Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 21px;
      word-break: break-word;
      overflow: auto;
      padding-bottom: 1px;
      margin: 5px 8px;
      letter-spacing: 0.5px;
      color: ${(props) => (props.isLight ? "rgb(26, 26, 27)" : "#d7dadc")};
      text-align: left;
      margin-left: 35px;
    }
    .postImage {
      width: 100%;
      height: max-content;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 15px 0px;

      img {
        max-height: 512px;
      }
    }
    .comments {
      margin-left: 25px;
      align-items: center;
      display: flex;
      flex-direction: row;
      height: 40px;
      padding-right: 10px;
      fill: #818384;
      cursor: pointer;
      opacity: 0.9 !important;
      color: #818384;
      font-weight: 700;
      font-size: 12px;
      font-family: Arial, sans-serif;
      line-height: 16px;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        word-break: normal;
      }
      .icon:nth-child(n + 2):hover {
        background: ${(props) =>
          props.isLight ? "rgb(237, 237, 237)" : "rgba(215, 218, 220, 0.1)"};
      }
      .icon > div:nth-child(1) {
        font-size: 23px;
        font-weight: 400;
        height: 24px;
        line-height: 20px;
        vertical-align: middle;
        width: 20px;
        margin-right: 7px;
      }
      .withoutIcon {
        font-weight: 700 !important;
        font-size: 12px !important;
        font-family: Arial, sans-serif;
        line-height: 16px;
        width: max-content !important;
        height: 20px !important;
      }
      .icon > div {
        margin-right: 8px;
      }
    }
  }
  .likes {
    display: flex;
    flex-direction: row;
    left: 6px;
    width: 50px !important;
    padding: 8px 4px 8px 0;
    /* position: absolute; */
    bottom: 6px;
    align-items: center;
    justify-content: space-evenly;
    width: 40px;
    & > div:nth-child(2) {
      margin: 0px 5px;
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
      pointer-events: none;
      word-break: normal;
      color: ${(props) => (props.isLight ? " rgb(26, 26, 27)" : "#d7dadc")};
    }
    & > svg {
      line-height: 30px;

      cursor: pointer;
      opacity: 0.8;
      height: 30px;
      width: 26px;
      font-size: 25px;
    }
    & > svg:nth-child(1) {
      fill: ${(props) => (props.isVoted === 1 ? "#0d5fcb" : "#818384")};
    }
    & > svg:nth-child(3) {
      fill: ${(props) => (props.isVoted === -1 ? "rgb(201 13 13)" : "#818384")};
      margin-top: 2px !important;
    }
    & > svg:hover {
      background: rgb(237, 237, 237);
      fill: #4b5864;
    }
  }
  .line {
    position: absolute;
    height: calc(100% - 50px);
    width: 3px;
    background: ${(props) => (props.isLight ? "rgb(237, 239, 241)" : "rgb(52, 53, 54)")};
    left: 34px;
    top: 41px;
  }
`;
export { CommentsItem };
