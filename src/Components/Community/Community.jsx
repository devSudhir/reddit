import { CreatePost } from "../HomePage/Feed/CreatePost";
import { Feed } from "../HomePage/Feed/Feed";
import styled from "styled-components";
import { CommunityHeader } from "./CummunityHeader";
import { useSelector } from "react-redux";
import { CommunitySidebar } from "../CommunitySidebar/CommunitySidebar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-spinkit";

function Community() {
  const { isLight } = useSelector((state) => state.color);
  const { communityId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    getAllPost();
  }, []);

  // getting all post from backend
  async function getAllPost() {
    let postData = await axios.get(
      `https://reddit-new.herokuapp.com/posts/community/${communityId}`
    );
    setData(postData.data.post);
    //console.log(postData.data.post, "thd");
    setLoading(false);
  }

  return isLoading ? (
    <AppLoading>
      <Spinner name="ball-spin-fade-loader" color="#0079D3" fadeIn="none" />
    </AppLoading>
  ) : (
    <>
      <CommunityHeader communityId={communityId} />
      <StyledDiv isLight={isLight}>
        <div className="feedDiv">
          <Feed community={true} data={data} />
        </div>
        <div>
          <div className="fake">
            <CommunitySidebar />
          </div>
        </div>
      </StyledDiv>
    </>
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
  background: ${(props) => (props.isLight ? "#edeff1" : "rgb(3,3,3)")};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  & > div {
    margin-top: 30px;
  }
  & > div:nth-child(2) {
    margin-top: 30px;
    margin-left: 30px;
  }
  .fake {
    width: 300px;
    height: 200px;
  }
`;
export { Community };
