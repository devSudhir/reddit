import styled from "styled-components";
import { useSelector } from "react-redux";

function Messages({ data, currentUser }) {
  const { isLight } = useSelector((state) => state.color);
  return (
    <Div isLight={isLight} currentUser={currentUser}>
      <div className={currentUser ? "right" : "left"}>{data.text}</div>
    </Div>
  );
}

const Div = styled.div`
  /* height: 43px; */
  width: 100%;
  padding: 7px 24px;
  display: flex;
  padding: 7px 24px;
  justify-content: ${(props) => (props.currentUser ? "right" : "left")};

  & > div {
    padding: 4px 10px;
    padding-bottom: 6px;
    max-width: 80%;
    border-radius: 13px;
  }
  .left {
    background: ${(props) => (props.isLight ? "#bfbcb9" : "#262D31;")};
    color: ${(props) => (props.isLight ? "#202020" : "#cdced0;")};
  }

  .right {
    background: ${(props) => (props.isLight ? "#56a6e1" : "#056162;")};
    color: ${(props) => (props.isLight ? "#202020" : "#cdced0;")};
  }
`;

export { Messages };
