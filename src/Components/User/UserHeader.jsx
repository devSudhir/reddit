import styled from "styled-components";
import { useSelector } from "react-redux";

function UserHeader({ handleValue, value }) {
  const { isLight } = useSelector((state) => state.color);
  return (
    <Header isLight={isLight}>
      <div>
        <ul>
          <li
            onClick={() => {
              handleValue(1);
            }}
            className={value === 1 ? "active" : null}
          >
            OVERVIEW
          </li>
          <li
            onClick={() => {
              handleValue(2);
            }}
            className={value === 2 ? "active" : null}
          >
            POST
          </li>
          <li
            onClick={() => {
              handleValue(3);
            }}
            className={value === 3 ? "active" : null}
          >
            COMMENTS
          </li>
          <li
            onClick={() => {
              handleValue(4);
            }}
            className={value === 4 ? "active" : null}
          >
            AWARDS RECIEVED
          </li>
        </ul>
      </div>
    </Header>
  );
}

const Header = styled.div`
  border: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")};
  width: 100%;
  padding: 10px 0px 0px 0px;
  width: 100%;
  height: max-content;
  box-sizing: border-box;
  background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};

  & > div {
    max-width: 984px;

    margin: auto;
  }
  & ul {
    display: flex;
    margin: 0px;
    padding: 0px;
    .active {
      color: ${(props) => (props.isLight ? " #0079d3" : "#D7DADC")};
      box-shadow: inset 0 -2px 0 0 ${(props) => (props.isLight ? " #0079d3" : "#D7DADC")};
    }
    li {
      display: block;
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      color: ${(props) => (props.isLight ? "#1A1A1B" : "#D7DADC")};
      cursor: pointer;
      margin: 0 5px;
      padding: 3px 8px;
      padding-bottom: 10px;
      white-space: nowrap;
    }
    li:hover {
      color: ${(props) => (props.isLight ? " #0079d3" : "#D7DADC")};
    }
  }
`;
export { UserHeader };
