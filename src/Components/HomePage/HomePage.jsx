import { Feed } from "./Feed/Feed";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TrendingCards from "./Trending/TrendingCards";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-spinkit";
import { Sidebar } from "../Sidebar/Sidebar";

function HomePage() {
  const { isLight } = useSelector((state) => state.color);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    getAllPost();
  }, []);

  //console.log(data);
  // getting all post from backend
  async function getAllPost() {
    let postData = await axios.get("https://reddit-new.herokuapp.com/posts");

    setData(postData.data.posts);
    setLoading(false);
  }

  return isLoading ? (
    <AppLoading>
      <Spinner name="ball-spin-fade-loader" color="#0079D3" fadeIn="none" />
    </AppLoading>
  ) : (
    <>
      <TrendingCards />
      <StyledDiv isLight={isLight}>
        <div className="feedDiv">
          <Feed data={data} />
        </div>
        <div>
          {/* <div className="fake"> */}
          <div>
            <Sidebar />
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
  background: ${(props) => (props.isLight ? "#dae0e6" : "rgb(3,3,3)")};
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

    box-sizing: border-box;
  }
`;

export default HomePage;
