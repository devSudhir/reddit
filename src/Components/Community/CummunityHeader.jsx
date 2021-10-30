import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";

function CommunityHeader({ communityId }) {
  const { isLight } = useSelector((state) => state.color);
  const [data, setData] = useState();

  useEffect(() => {
    getCommunity();
  }, []);

  async function getCommunity() {
    let postData = await axios.get(`https://reddit-new.herokuapp.com/community/${communityId}`);
    setData(postData.data.community);
    //console.log(data, "thd");
  }

  return (
    <Div data={data} isLight={isLight}>
      <div className="backgroundImg"></div>
      <div className="communityData">
        <div className="communityTitle">
          <div className="avatar">
            <Avatar alt="Remy Sharp" src="/broken-image.jpg">
              {data?.name?.charAt(0)}
            </Avatar>
          </div>
          <div className="titleDiv">
            <div className="upperText">
              <div>r/{data?.name}</div>
            </div>
            <div className="join">Join</div>
          </div>
        </div>
        <div className="list">
          <ul>
            <li>Post</li>
            <li>Predictions</li>
            <li>Wiki</li>
            <li>FAQ</li>
            <li>Rules</li>
            <li>AMAs</li>
            <li>Discussions</li>
          </ul>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: max-content;

  box-sizing: border-box;
  background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
  .backgroundImg {
    width: 100%;
    height: 165px;
    background: center top / cover no-repeat rgb(55, 60, 63);
  }
  .communityData {
    max-width: 984px;

    background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 16px 0 9px;
  }
  .communityTitle {
    align-items: flex-start;
    display: flex;
    margin-bottom: 12px;
    margin-top: -14px;
  }
  .communityTitle img {
    width: 100%;
    height: 100%;
  }
  .communityTitle > div:nth-child(1) {
    border-radius: 100%;
    border: 4px solid #fff;
    display: inline-block;
    height: 72px;
    width: 72px;
    background: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
    box-sizing: border-box;
  }
  .titleDiv {
    display: flex;
    align-items: flex-start;
    flex: 1;
    padding-left: 16px;
    margin-top: 24px;
    position: relative;
    width: calc(100% - 80px);
  }
  .upperText {
    max-width: calc(100% - 96px);
    padding-right: 24px;
  }
  .upperText > div:nth-child(1) {
    color: ${(props) => (props.isLight ? "rgb(28, 28, 28)" : "#D7DADC")};
    flex: 1;
    font-size: 28px;
    font-weight: 700;
    line-height: 32px;
    overflow: hidden;
    padding: 0 2px 4px 0;
    text-overflow: ellipsis;
    width: 100%;
  }
  .upperText > div:nth-child(2) {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: #7c7c7c;
  }
  .titleDiv > .join {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    font-family: Noto Sans, Arial, sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    min-height: 32px;
    min-width: 32px;
    padding: 4px 16px;
    border-radius: 20px;
    background: ${(props) => (props.isLight ? "rgb(55, 60, 63)" : "#D7DADC")};
    color: ${(props) => (props.isLight ? "#D7DADC" : "rgb(55, 60, 63)")};
    cursor: pointer;
  }
  .list > ul {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    padding-bottom: 4px;
    padding-top: 4px;
    color: #7c7c7c;
    li {
      display: block;
      margin: 0px;
      padding-left: 5px;
      padding-right: 5px;
      margin-right: 17px;
      cursor: pointer;
    }
    li:hover {
      color: rgb(100, 109, 115);
    }
  }
  .avatar .MuiAvatar-root {
    width: 100%;
    height: 100%;
  }
`;
export { CommunityHeader };
