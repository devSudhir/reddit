import { CommentsItem } from "./CommentItem";
import styled from "styled-components";
import { FeedItem } from "../HomePage/Feed/FeedItem";
import { useSelector } from "react-redux";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { RiFileListLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-spinkit";
import { useState, useEffect } from "react";
import CommentBox from "./CommentBox";
import { CommunitySidebar } from "../CommunitySidebar/CommunitySidebar";

function CommentsPage() {
  const { isLight } = useSelector((state) => state.color);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const { postId } = useParams();
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const [vote, setVote] = useState(0);
  const [isVoted, setIsVoted] = useState(0);

  useEffect(() => {
    getPost();
  }, [comment]);

  console.log(data);

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

  // getting  post and comments from backend
  async function getPost() {
    let postData = await axios.get(`https://reddit-new.herokuapp.com/posts/${postId}`);
    let comm = await axios.get(`https://reddit-new.herokuapp.com/comments/${postId}`);
    setData(postData.data.post);
    setComment(comm.data.comment);
    setLoading(false);
  }

  return isLoading ? (
    <AppLoading>
      <Spinner name="ball-spin-fade-loader" color="#0079D3" fadeIn="none" />
    </AppLoading>
  ) : (
    <StyledDiv isLight={isLight}>
      <div className="commentHeader">
        <div>
          <div className="likeDiv">
            <Likes isLight={isLight} isVoted={isVoted}>
              {/* <ImArrowUp
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
              /> */}
            </Likes>
            <div className="upperTitle">
              <RiFileListLine />
              <div>{data.text}</div>
            </div>
          </div>
          <div
            onClick={() => {
              history.goBack();
            }}
            className="commentClose"
          >
            <IoMdClose />
            <div>Close</div>
          </div>
        </div>
      </div>

      <div>
        <div className="feedDiv">
          <FeedItem comments={true} data={data} />
          <CommentBox />
          {comment.map((a) => (
            <CommentsItem data={a} key={a._id} />
          ))}
        </div>
        <div className="sideDiv">
          <div className="fake">
            <CommunitySidebar />
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}

const AppLoading = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background: rgb(46, 47, 48);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .feedDiv > div:nth-child(1) {
    margin-bottom: -10px;
  }
  & > div:nth-child(2) {
    max-width: 1068px;
    height: max-content;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background-color: ${(props) => (props.isLight ? "#DAE0E6" : "#030303")};
    box-sizing: border-box;
    padding: 0px 60px;
    padding-bottom: 20px;
  }
  .feedDiv {
    margin-top: 30px;
  }
  .sideDiv {
    margin-top: 30px;
    margin-left: 30px;
  }
  .fake {
    width: 300px;
    height: 200px;
    /* border: 1px solid black; */
  }
  .commentHeader {
    background: #030303;
    box-sizing: border-box;
    height: 48px;
    left: 0;
    margin: 0 auto;
    max-width: 1068px;
    position: sticky;
    right: 0;
    top: 0;
    transition: top 0.3s ease;
    width: calc(100% - 160px);
    z-index: 1;
    color: #d7dadc;

    > div {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      height: 100%;
      margin: auto;
      padding: 0 38px 0 57px;
      width: 100%;
    }
  }
  .likeDiv {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .upperTitle {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      line-height: 30px;
      fill: #d7dadc;
      cursor: pointer;
      height: 30px;
      width: 20px;
      margin-right: 10px;
    }

    > div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
    }
  }
  .commentClose {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      fill: #d7dadc !important;
      font-size: 25px;
      margin-right: 2px;
    }
    div {
      font-size: 13px;
      font-weight: 600;
    }
  }
`;

const Likes = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 4px 8px 0;
  align-items: center;
  justify-content: space-evenly;
  width: 70px;
  margin-right: 10px;
  & > div:nth-child(2) {
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    pointer-events: none;
    word-break: normal;
    margin: 0px 5px;
    color: "#d7dadc";
  }
  & > svg {
    line-height: 30px;
    cursor: pointer;
    opacity: 0.8;
    height: 30px;
    width: 20px;
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
export { CommentsPage };
