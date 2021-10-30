import styled from "styled-components";
import { ImArrowUp, ImArrowDown, ImRedo } from "react-icons/im";
import { HiOutlinePlus } from "react-icons/hi";
import { FaRegCommentAlt } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { RiBookmarkLine } from "react-icons/ri";
import { CgImage } from "react-icons/cg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CommunityModal from "./CommunityModal"
function FeedItem({ community = false, comments, type = 1, data }) {
  const { isLight } = useSelector((state) => state.color);
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState(0);
  const [vote, setVote] = useState(0);
  const [isVoted, setIsVoted] = useState(0);
  const history = useHistory();
  const [modalDisplay, setModalDisplay] = useState(false);
  console.log('modalDisplay:', modalDisplay)

  // console.log("data community", data);
  // extractin time past
  const currentDate = Date.now();
  const postDate = new Date(data?.createdAt || 0);
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

  useEffect(() => {
    getComments(data._id);
    updateVote();
  }, []);

  function updateVote() {
    voteCount(data._id);
    if (user._id) {
      voteStatus(data._id, user?._id);
    }
  }

  ////////getting comments count
  async function getComments(postId) {
    let commentsCount = await axios.get(`https://reddit-new.herokuapp.com/comments/${postId}`);
    setComment(commentsCount.data);
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

  const handleRouteCommunity = (e) => {
    // e.stopPropagation();
    history.push(`/r/${data.communityId._id}`);
  };
  //console.log("data", data);
  const handleRouteUser = (e) => {
    // e.stopPropagation();
    history.push(`/user/${data.userId._id}`);
  };

  const handleRouteComments = (id) => {
    history.push(`/r/communityName/post/${data._id}`);
  };

  return type === 1 ? (
    <Con onClick={() => { setModalDisplay(true);console.log("hellow")}} isLight={isLight}>
      <Likes isLight={isLight} isVoted={isVoted}>
        <ImArrowUp
          onClick={(e) => {
            e.stopPropagation();
            if (!user._id) {
              alert("Please login first");
              return;
            }
            voteUp(data._id, user?._id);
          }}
        />
        <div >{vote || 0}</div>
        <ImArrowDown
          onClick={(e) => {
            e.stopPropagation();
            if (!user._id) {
              alert("Please login first");
              return;
            }
            voteDown(data._id, user?._id);
          }}
        />
          {/* <ImArrowDown
            onClick={() => {setModalDisplay(true)}}
          /> */}
      </Likes>
      <Box isLight={isLight}>
        <div className="upper">
          {!community && (
            <div className="profileImg">
              <img src={data.userId.profile_url} alt="" />
            </div>
          )}
          <div className="text">
            <span
              onClick={(e) => {
                handleRouteCommunity(e);
              }}
            >
              {!community && data.communityId && `r/${data.communityId.name}`}
            </span>
            <span
              onClick={(e) => {
                handleRouteUser(e);
              }}
            >
              Posted by u/{data.userId.name}
            </span>
            <span>
              {days ? days : hours ? hours : mins}
              {days ? "days" : hours ? "hours" : "mins"} ago
            </span>
          </div>
          {!community && !comments && (
            <div className="join">
              <HiOutlinePlus />
              <span>Join</span>
            </div>
          )}
        </div>
        <div className="title">{data.text}</div>
        <div className="postImage">
          <div>
            <img src={data.imageUrl} alt="" />
          </div>
        </div>
        <div className="comments">
          <div
            onClick={() => {
              handleRouteComments();
            }}
            className="icon"
          >
            <div style={{ fontSize: "22px" }}>
              <FaRegCommentAlt />
            </div>
            <div>{comment.count} Comments</div>
          </div>
          <div className="icon">
            <div>
              <FiGift />
            </div>
            <div>Awards</div>
          </div>
          <div className="icon">
            <div>
              <ImRedo />
            </div>
            <div>Share</div>
          </div>
          <div className="icon">
            <div>
              <RiBookmarkLine />
            </div>
            <div>Share</div>
          </div>
          <div className="icon">
            <div>
              <BsThreeDots />
            </div>
          </div>
        </div>
      </Box>
      <CommunityModal data={data} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
    </Con>
  ) : type === 2 ? (
    <Classic isLight={isLight} isVoted={isVoted}>
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
      <div className="postImage">
        <div
          style={{
            backgroundImage: `url(${data.imageUrl})`,
          }}
        ></div>
      </div>
      <div className="box">
        <div className="title">{data.text}</div>
        <div className="upper">
          <div className="text">
            <span
              onClick={(e) => {
                handleRouteCommunity(e);
              }}
            >
              {!community && data.communityId && `r/${data.communityId.name}`}
            </span>
            <span
              onClick={(e) => {
                handleRouteUser(e);
              }}
            >
              Posted by u/{data.userId.name}
            </span>
            <span>
              {" "}
              {days ? days : hours ? hours : mins}
              {days ? "days" : hours ? "hours" : "mins"} ago
            </span>
          </div>
          {!community && !comments && (
            <div className="join">
              <HiOutlinePlus />
            </div>
          )}
        </div>

        <div className="comments">
          <div
            onClick={() => {
              handleRouteComments();
            }}
            className="icon"
          >
            <div>
              <FaRegCommentAlt />
            </div>
            <div>{comment.count} Comments</div>
          </div>
          <div className="icon">
            <div>
              <FiGift />
            </div>
            <div>Awards</div>
          </div>
          <div className="icon">
            <div>
              <ImRedo />
            </div>
            <div>Share</div>
          </div>
          <div className="icon">
            <div>
              <RiBookmarkLine />
            </div>
            <div>Share</div>
          </div>
          <div className="icon">
            <div>
              <BsThreeDots />
            </div>
          </div>
        </div>
      </div>
    </Classic>
  ) : (
    <Compact isLight={isLight} isVoted={isVoted}>
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
      <div className="postImage">
        <div>
          <CgImage />
        </div>
      </div>
      <div className="box">
        <div className="title">{data.text}</div>
        <div className="upper">
          <div className="text">
            <span
              onClick={(e) => {
                handleRouteCommunity(e);
              }}
            >
              {!community && data.communityId && `r/${data.communityId.name}`}
            </span>
            <span
              onClick={(e) => {
                handleRouteUser(e);
              }}
            >
              Posted by u/{data.userId.name}
            </span>
            <span>
              {days ? days : hours ? hours : mins}
              {days ? "days" : hours ? "hours" : "mins"} ago
            </span>
          </div>
          {!community && !comments && (
            <div className="join">
              <HiOutlinePlus />
            </div>
          )}
        </div>
      </div>
      <div className="comments">
        <div
          onClick={() => {
            handleRouteComments();
          }}
          className="icon"
        >
          <div>
            <FaRegCommentAlt />
          </div>
          <div>{comment.count}</div>
        </div>

        <div className="icon">
          <div>
            <BsThreeDots />
          </div>
        </div>
      </div>
    </Compact>
  );
}

const Compact = styled.div`
  position: relative;
  cursor: pointer;
  width: 640px;
  box-sizing: border-box;
  background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
  border-radius: 4px;
  border: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")};
  display: flex;
  margin-bottom: 16px;

  align-items: center;
  justify-content: flex-start;
  &:hover {
    border: 1px solid ${(props) => (props.isLight ? "#898989" : "#818384")};
  }

  .likes {
    border-right: 1px solid ${(props) => (props.isLight ? "rgb(237, 239, 241)" : "rgb(52, 53, 54)")};
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    padding: 8px 5px 8px 5px;
    align-items: center;
    justify-content: space-evenly;
    width: 80px;
    background: ${(props) => (props.isLight ? "#f7f8f9" : "#161617")};
    & > div:nth-child(2) {
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
      pointer-events: none;
      margin: 0px 5px;
      word-break: normal;
      color: ${(props) => (props.isLight ? " rgb(26, 26, 27)" : "#d7dadc")};
    }
    & > svg {
      line-height: 30px;
      cursor: pointer;
      opacity: 0.8;
      height: 45px;
      width: 26px;
    }
    & > svg:nth-child(1) {
      fill: ${(props) => (props.isVoted === 1 ? "#0d5fcb" : "#818384")};
    }
    & > svg:nth-child(3) {
      fill: ${(props) => (props.isVoted === -1 ? "rgb(201 13 13)" : "#818384")};
      margin-top: 2px;
    }
    & > svg:hover {
      background: rgb(237, 237, 237);
      fill: #4b5864;
    }
  }
  .postImage {
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 0px 0px 6px;

    div {
      transition: filter 0.5s;
      font-size: 22px;
      border: none;
      border-radius: 4px;
    }
    svg {
      fill: rgb(135, 138, 140);
      color: rgb(135, 138, 140);
    }
  }
  .box {
    height: 100%;
    border-radius: 4px;
    padding-left: 10px;
    box-sizing: border-box;
    max-width: 420px;
    flex-grow: 1;
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
      &>img{
        object-fit: cover;
      }
    }
    .text {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      /* flex: 1 1 auto; */
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

      box-sizing: border-box;
      border-radius: 20px;
      cursor: pointer;
      svg {
        width: 18px;
        height: 18px;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .title {
      margin: 5px 8px;
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      color: ${(props) => (props.isLight ? "#222222" : "#d7dadc")};
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .comments {
    /* position: absolute;
      right: 10px;
      top: 10px; */
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 24px;
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
    .icon:hover {
      background: ${(props) => (props.isLight ? "rgb(237, 237, 237)" : "rgba(215, 218, 220, 0.1)")};
    }
    .icon > div:nth-child(1) {
      font-size: 19px;
      font-weight: 400;
      height: 24px;
      line-height: 20px;
      vertical-align: middle;
      width: 20px;
      margin-right: 7px;
    }
    .icon > div {
      margin-right: 8px;
      height: 19px;
    }
  }
`;
const Classic = styled.div`
  position: relative;
  cursor: pointer;
  width: 640px;
  min-height: 100px;
  box-sizing: border-box;
  background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
  border-radius: 4px;
  border: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")};
  display: flex;
  margin-bottom: 16px;
  padding: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    border: 1px solid ${(props) => (props.isLight ? "#898989" : "#818384")};
  }

  .likes {
    display: flex;
    flex-direction: column;
    left: 0px;
    padding: 8px 5px 8px 5px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    align-items: center;
    justify-content: space-evenly;
    width: 40px;
    background: ${(props) => (props.isLight ? "#f7f8f9" : "#161617")};
    & > div:nth-child(2) {
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
      pointer-events: none;
      word-break: normal;
      color: ${(props) => (props.isLight ? " rgb(26, 26, 27)" : "#d7dadc")};
    }
    & > svg {
      line-height: 30px;
      fill: #818384;
      cursor: pointer;
      opacity: 0.8;
      height: 30px;
      width: 26px;
    }
    & > svg:nth-child(1) {
      fill: ${(props) => (props.isVoted === 1 ? "#0d5fcb" : "#818384")};
    }
    & > svg:nth-child(3) {
      fill: ${(props) => (props.isVoted === -1 ? "rgb(201 13 13)" : "#818384")};
      margin-top: 2px;
    }
    & > svg:hover {
      background: rgb(237, 237, 237);
      fill: #4b5864;
    }
  }
  .postImage {
    width: 100px;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px 0px 0px 35px;

    div {
      transition: filter 0.5s;
      height: 72px;
      width: 96px;
      border: none;
      border-radius: 4px;
      background-position: 50% top;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .box {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    padding-left: 10px;
    box-sizing: border-box;
    max-width: 480px;
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
      &>img{
        object-fit: cover;
      }
    }
    .text {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      /* flex: 1 1 auto; */
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

      box-sizing: border-box;
      border-radius: 20px;
      cursor: pointer;
      svg {
        width: 18px;
        height: 18px;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .title {
      margin: 5px 8px;
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      color: ${(props) => (props.isLight ? "#222222" : "#d7dadc")};
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .comments {
      align-items: center;
      display: flex;
      flex-direction: row;
      height: 24px;
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
      .icon:hover {
        background: ${(props) =>
          props.isLight ? "rgb(237, 237, 237)" : "rgba(215, 218, 220, 0.1)"};
      }
      .icon > div:nth-child(1) {
        font-size: 19px;
        font-weight: 400;
        height: 24px;
        line-height: 20px;
        vertical-align: middle;
        width: 20px;
        margin-right: 7px;
      }
      .icon > div {
        margin-right: 8px;
        height: 19px;
      }
    }
  }
`;

const Con = styled.div`
  position: relative;
  cursor: pointer;
  width: 640px;
  min-height: 100px;
  box-sizing: border-box;
  background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
  border-radius: 4px;
  border: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")};
  display: flex;
  margin-bottom: 16px;
  padding: 8px;
  align-items: flex-start;
  justify-content: center;
  &:hover {
    border: 1px solid ${(props) => (props.isLight ? "#898989" : "#818384")};
  }
`;

const Likes = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 8px 4px 8px 0;
  position: absolute;
  top: 6px;
  align-items: center;
  justify-content: space-evenly;
  width: 40px;
  & > div:nth-child(2) {
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    pointer-events: none;
    word-break: normal;
    color: ${(props) => (props.isLight ? " rgb(26, 26, 27)" : "#d7dadc")};
  }
  & > svg {
    line-height: 30px;
    fill: #818384;
    cursor: pointer;
    opacity: 0.8;
    height: 30px;
    width: 26px;
  }
  & > svg:nth-child(1) {
    fill: ${(props) => (props.isVoted === 1 ? "#0d5fcb" : "#818384")};
  }
  & > svg:nth-child(3) {
    fill: ${(props) => (props.isVoted === -1 ? "rgb(201 13 13)" : "#818384")};
    margin-top: 2px;
  }
  & > svg:hover {
    background: rgb(237, 237, 237);
    fill: #4b5864;
  }
`;

const Box = styled.div`
  padding-top: 8px;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding-left: 40px;
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
    &>img{
        object-fit: cover;
    }
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
    margin: 5px 8px;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    color: ${(props) => (props.isLight ? "#222222" : "#d7dadc")};
    text-align: left;
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
    .icon:hover {
      background: ${(props) => (props.isLight ? "rgb(237, 237, 237)" : "rgba(215, 218, 220, 0.1)")};
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
    .icon > div {
      margin-right: 8px;
    }
  }
`;
export { FeedItem };
