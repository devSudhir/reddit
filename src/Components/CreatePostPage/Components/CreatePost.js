import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostInput from "./PostInput";
import ImageInput from "./ImageInput";
import LinkInput from "./LinkInput";
import { BsImage } from "react-icons/bs";
import { GoNote } from "react-icons/go";
import { BsLink45Deg } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { loadData } from "../../../utils/localStorage";
import { useHistory } from "react-router";
import Spinner from "react-spinkit";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

const CreatePost = () => {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState("post");
  const [communityExtend, setCommunityExtend] = useState(false);
  const [draft, setDraft] = useState(0);
  const [file, setFile] = useState("");
  const [text, setText] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [inputText, setInputText] = useState("");
  const [communityId, setCommunityId] = useState(" ");

  const user = useSelector((state) => state.auth.user);
  const [image, setImage] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const communityHandler = (id, name) => {
    setInputText(name);
    setCommunityId(id);
  };

  const handleFileUplod = () => {
    setIsLoading(true);
    const { _id } = loadData("user");
    const token = loadData("token");
    const formData = new FormData();
    formData.append("imageUrl", file);
    formData.append("text", text);
    formData.append("userId", _id);
    formData.append("communityId", communityId);

    axios
      .post("https://reddit-new.herokuapp.com/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUploadedFile(res.data);
        console.log(uploadedFile);
        setIsLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    axios
      .get("https://reddit-new.herokuapp.com/community")
      .then((res) => {
        setCommunities(res.data.communities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StyledCreatePost>
      <div className="create-post-head">
        <h2>Create Post</h2>
        <div>
          Draft <span>{draft}</span>
        </div>
      </div>

      <div
        onClick={() => setCommunityExtend(!communityExtend)}
        className="community-bar"
      >
        <FiSearch />
        <input
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          placeholder="Choose a Community "
        />
        <MdKeyboardArrowDown />
        {communityExtend && (
          <div className="coummnity-dropdown">
            <p>Your profile</p>
            <div
              onClick={() => {
                setInputText(user.name);
              }}
            >
              <HeaderAvatar src={user.profile_url} alt={user.name} />
              {user.name}
            </div>
            <p>Your Communities</p>
            {communities.map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => {
                    communityHandler(item._id, item.name);
                  }}
                >
                  <FaUserCircle />
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="create-post-container">
        <div className="input-mode">
          <span
            style={{ borderTopLeftRadius: ".5rem" }}
            onClick={() => setActiveItem("post")}
            className={activeItem === "post" ? "active-item" : ""}
          >
            <GoNote />
            Post
          </span>
          <span
            onClick={() => setActiveItem("image")}
            className={activeItem === "image" ? "active-item" : ""}
          >
            <BsImage /> Image & Video
          </span>
          <span
            style={{ borderTopRightRadius: ".5rem", borderRight: "none" }}
            onClick={() => setActiveItem("link")}
            className={activeItem === "link" ? "active-item" : ""}
          >
            <BsLink45Deg />
            Link
          </span>
        </div>

        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="title-input"
          type="text"
          placeholder="Title"
        />
        {activeItem === "post" ? (
          <PostInput />
        ) : activeItem === "image" ? (
          <ImageInput handleFile={handleFile} image={image} />
        ) : (
          activeItem === "link" && <LinkInput />
        )}

        <div className="post-btns">
          <div>
            <button onClick={() => setDraft(1)} className="draft-btn">
              SAVE DRAFT
            </button>
            <button onClick={handleFileUplod} className="post-btn">
              POST
            </button>
          </div>
        </div>

        <div className="confirm-checkbox">
          <input type="checkbox" checked="checked" />
          Send me post reply notification
        </div>
      </div>
      {isLoading ? (
        <AppLoading>
          <Spinner name="ball-spin-fade-loader" color="#0079D3" fadeIn="none" />
        </AppLoading>
      ) : null}
    </StyledCreatePost>
  );
};
export default CreatePost;

const StyledCreatePost = styled.div`
  width: 100%;
  min-height: 500px;
  .create-post-container {
    width: 100%;
    padding: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 0.4rem;
  }
  .community-bar {
    width: 300px;
    height: 2.5rem;
    background: #fff;
    border-radius: 0.3rem;
    border: 1px #ccc solid;
    margin-bottom: 1rem;
    padding: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    & > svg {
      width: 40px;
      /* border: solid; */
      font-size: 140%;
    }
    & > input {
      border: none;
      width: 250px;
      height: 100%;
      outline: none;
    }
    .coummnity-dropdown {
      position: absolute;
      top: 40px;
      left: 0;
      background: #fff;
      width: 100%;
      height: 160px;
      overflow-y: scroll;
      z-index: 50;
      border-radius: 8px;
      padding: 1rem;
      & > p {
        color: #ccc;
      }
      & > div {
        padding: 0.4rem;
        display: flex;
        border-radius: 3px;
        align-items: center;
        color: #333;
        &:hover {
          background-color: #0079d3;
          color: white;
        }
        & > svg {
          margin-right: 0.4rem;
          color: #cccc;
        }
      }
    }
  }
  .create-post-head {
    color: #1c1c1c;
    display: flex;
    border-bottom: 1px solid #ffffff;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    align-items: center;
    & > h2 {
      width: 80%;
      font-size: 1.1rem;
    }
    & > div {
      width: 15%;
      color: #0272c5;
      text-align: center;
      border-radius: 1rem;
      cursor: pointer;
      padding: 0.4rem;
      &:hover {
        background: #cccc;
      }
    }
  }

  .input-mode {
    display: flex;
    width: 100%;
    border: 1px #ccc solid;
    border-bottom: none;
    border-radius: 0.5rem 0.5rem 0 0;
    & > span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.3%;
      padding: 0.6rem;
      text-align: center;
      font-weight: 600;
      color: #878a8c;
      border-bottom: solid 1px #ccc;
      cursor: pointer;
      border-right: 1px #ccc solid;
      & > svg {
        margin-right: 0.5rem;
      }
      &:hover {
        background: #edf7ff;
      }
    }

    .active-item {
      color: #0079d3;
      border-bottom: solid 2px #0079d3;
      padding-bottom: 9px;
    }
  }

  .title-input {
    margin-top: 0.5rem;
    width: 98%;
    margin: 0.4rem auto;
    height: 40px;
    font-size: 1.2rem;
    padding: 0.2rem 1rem;
    outline: none;
    border: solid 1px #ccc;
    border-radius: 0.2rem;
    &:hover {
      border: solid 1px #000;
    }
    &::placeholder {
      font-size: 1rem;
      color: #878a8c;
    }
  }

  .post-btns {
    width: 99%;
    /* border: solid blue; */
    height: 50px;
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;
    & > div {
      right: 0;
      position: absolute;
    }
    & > div > button {
      cursor: pointer;
      width: fit-content;
      height: 2rem;
      padding: 0.3rem 1rem;
      border-radius: 1rem;
      background: #0079d3;
      color: #fff;
      border: 1px solid #0079d3;
      outline: none;
      font-weight: 600;
    }
    .draft-btn {
      color: #0079d3;
      background: #fff;
      margin-right: 1rem;
    }
  }
  .confirm-checkbox {
    background: #f6f7f8;
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 1rem;
    color: #1c1c1c;
    font-size: 100%;
    border-radius: 0 0 0.5rem 0.5rem;
    margin-top: 0.5rem;
    & > input {
      margin-right: 0.5rem;
    }
  }
`;

const AppLoading = styled.div`
  width: 100vh;
  height: 100vh;
  position: absolute;
  top: 140px;
  left: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  margin-right: 8px;
  :hover {
    opacity: 0.8;
  }
`;
