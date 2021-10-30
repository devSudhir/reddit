import styled from "styled-components";
import { useSelector } from "react-redux";
import { GoFileMedia } from "react-icons/go";
import { HiLink } from "react-icons/hi";
import { useHistory } from "react-router-dom"
import { Avatar } from "@material-ui/core";



function CreatePost() {
  const { isLight } = useSelector((state) => state.color);
  const history = useHistory();
  const user = useSelector(state => state.auth.user);
  return (
    <Con isLight={isLight}>
      <Avatar onClick={()=>{history.push(`/user/${user._id}`)}} src={user.profile_url }/>
      <input onClick={()=>{history.push("/create-post")}} type="text" placeholder="Create Post" />
      <GoFileMedia onClick={() => { history.push("/create-post") }} />
      <HiLink onClick={() => { history.push("/create-post") }}/>
    </Con>
  );
}
export { CreatePost };

const Con = styled.div`
  box-sizing: border-box;
  background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
  border-radius: 4px;
  border: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")};
  display: flex;
  margin-bottom: 16px;
  padding: 8px;
  width: 640px;
  align-items: center;
  justify-content: center;

  & > svg:nth-child(n + 2) {
    display: inline-block;
    padding: 6px 8px;
    margin-left: 5px;
    height: 36px;
    width: 36px;
    font-size: 20px;
    line-height: 20px;
    fill: #818384;
    cursor: pointer;
    opacity: 0.8;
  }
  & > svg:nth-child(n + 2):hover {
    background: ${(props) => (props.isLight ? "rgb(237, 237, 237)" : "rgba(215, 218, 220, 0.1)")};
  }

  & > svg:nth-child(1) {
    border-radius: 50%;
    width: 38px;
    height: 38px;
    background: ${(props) => (props.isLight ? "#d7dfe2" : "rgb(129, 131, 132)")};
    fill: #fff;
    flex-basis: 38px;
    margin-right: 8px;
    border-radius: 50%;
    width: 38px;
    height: 38px;
  }
  & > input {
    background-color: ${(props) => (props.isLight ? "#F6F7F8" : "#272729")};
    border-radius: 4px;
    border: 1px solid ${(props) => (props.isLight ? "#EDEFF1" : "#343536")};
    box-shadow: none;
    box-sizing: border-box;
    color: ${(props) => (props.isLight ? "#1c1c1c" : "#D7DADC")};
    display: block;
    flex-grow: 1;
    height: 38px;
    margin-right: 8px;
    margin-left: 10px;

    outline: none;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    font-family: inherit;
  }
  &>div:first-child{
    cursor: pointer;
    &:hover{
      opacity: 0.8;
    }
  }
`;