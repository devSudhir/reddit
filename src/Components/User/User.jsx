import { Feed } from "../HomePage/Feed/Feed";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { UserHeader } from "./UserHeader";
import { useState, useEffect } from "react";
import { ProfileSidebar } from "../ProfileSidebar/ProfileSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-spinkit";

function User() {
  const { isLight } = useSelector((state) => state.color);
  const { userId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [value, setValue] = useState(1);

  useEffect(() => {
    getAllPost();
  }, []);

  // getting all post from backend
  async function getAllPost() {
    let postData = await axios.get(`https://reddit-new.herokuapp.com/posts/user/${userId}`);
    setData(postData.data.post);
    //console.log(postData, "thd");
    setLoading(false);
  }

  const handleValue = (n) => {
    setValue(n);
  };
  return isLoading ? (
    <AppLoading>
      <Spinner name="ball-spin-fade-loader" color="#0079D3" fadeIn="none" />
    </AppLoading>
  ) : (
    <>
      <UserHeader handleValue={handleValue} value={value} />
      <StyledDiv isLight={isLight}>
        <div className="feedDiv">
          <Feed data={data} userPage={true} />
        </div>
        <div>
          <div className="fake">
            <ProfileSidebar />
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
    margin-top: 67px;
    margin-left: 30px;
  }
  .fake {
    width: 300px;
    height: 200px;
  }
`;
export { User };
