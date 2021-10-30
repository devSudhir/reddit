import styled from "styled-components";
import { useSelector } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiShareBoxLine } from "react-icons/ri";
import { BsChevronDown } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineCamera, AiOutlineGif, AiOutlineCaretRight } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AllChatMember } from "./AllChatMember";
import { Messages } from "./Messages";
import Avatar from "@material-ui/core/Avatar";

import TextField from "@mui/material/TextField";

function Chat({ setChat }) {
  const { isLight } = useSelector((state) => state.color);
  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  //console.log(user);

  // getting all conversation of a user
  const [chatroom, setChatroom] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentFriend, setFriend] = useState("");
  const [arrivedM, setArrivedM] = useState();
  const socket = useRef();
  const [userSocketId, setUsersocketId] = useState();

  useEffect(() => {
    socket.current = io("https://reddit-new.herokuapp.com");
    socket.current.on("welcome", (data) => {
      //console.log(data);
    });
    socket.current.emit("addedUser", user._id);

    socket.current.on("getMessage", (data) => {
      setArrivedM({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    socket.current.on("getUsers", (users) => {
      //console.log("users", users);
      setUsersocketId(users);
    });
  }, [user]);

  useEffect(() => {
    arrivedM &&
      currentChat?.members.includes(arrivedM.senderId) &&
      setMessages((pre) => [...pre, arrivedM]);
    //console.log(currentChat, "currChat");
  }, [arrivedM]);

  useEffect(() => {
    getConversation();
    getAllUser();
  }, []);

  async function getConversation() {
    let res = await axios.get(`https://reddit-new.herokuapp.com/chatroom/${user._id}`);
    setChatroom(res.data.chatroom);
    console.log(res.data.chatroom, "chatroom");
  }
  async function getMsg() {
    try {
      const res = await axios.get(`https://reddit-new.herokuapp.com/msg/${currentChat._id}`);
      //console.log(res, "msg");
      setMessages(res.data.allMsg);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getMsg();
  }, [currentChat]);

  const handleSendMessage = async () => {
    if (newMessage === "") {
      return;
    }
    const payload = {
      senderId: user._id,
      text: newMessage,
      chatRoomId: currentChat._id,
    };

    const receiverId = currentChat.members.find((mem) => mem._id !== user._id);
    //console.log("receiverId", receiverId);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
      currentChatroomId: currentChat._id,
    });

    try {
      const res = await axios.post(`https://reddit-new.herokuapp.com/msg`, payload);
      //console.log(res.data.msg);
      setMessages([...messages, res.data.msg]);

      setNewMessage("");
    } catch (e) {
      console.log({ error: e });
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function getUser(data) {
    const friendsId = data.members.find((a) => a !== user._id);
    const res = await axios.get(`https://reddit-new.herokuapp.com/users/${friendsId}`);
    setFriend(res.data.user);
  }

  async function getAllUser() {
    let data = await axios.get("https://reddit-new.herokuapp.com/users");
    setAllUser(data.data.users);
  }

  const [allUser, setAllUser] = useState();
  const [userSearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const friendIdRef = useRef();

  const handleSearchUser = (e) => {
    setUserSearch(e.target.value);
    let newallUser = allUser.filter((a) => a.name.includes(userSearch));
    setSelectedUser(newallUser);
  };

  const handelAddchatroom = async () => {
    //console.log(chatroom);
    for (var i = 0; i < chatroom.length; i++) {
      let mem = chatroom[i].members;
      if (mem.includes(user._id) && mem.includes(friendIdRef.current)) {
        alert("Friend alreday in the list");
        return;
      }
    }
    if (!friendIdRef.current) {
      alert("Please add a friend");
      return;
    }
    let body = {
      members: [user._id, friendIdRef.current],
    };
    try {
      let data = await axios.post("https://reddit-new.herokuapp.com/chatroom", body);
      getConversation();
      //console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ChatDiv isLight={isLight}>
      <div className="rootDiv">
        <div className="leftPart">
          <div className="leftHeader">
            <div>
              <input
                type="text"
                placeholder="Search users"
                value={userSearch}
                onChange={handleSearchUser}
              />
              {selectedUser.length > 0 && userSearch !== "" && (
                <div className="hidden">
                  {selectedUser.map((a) => {
                    return (
                      <div
                        onClick={() => {
                          setUserSearch(a.name);
                          setSelectedUser([]);
                          friendIdRef.current = a._id;
                        }}
                        className="hiddenUser"
                      >
                        {a.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <div onClick={handelAddchatroom} className="join">
                <HiOutlinePlus />
              </div>
            </div>
          </div>
          <div className="allChatrooms">
            {chatroom.map((a) => (
              <div
                onClick={() => {
                  setCurrentChat(a);
                  getUser(a);
                }}
              >
                <AllChatMember data={a} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="rightPart">
          <div className="rightHeader">
            <span className="currentuserImage">
              {currentFriend.profile_url ? (
                <img src={currentFriend.profile_url} alt="" />
              ) : (
                <Avatar alt="Remy Sharp" src="/broken-image.jpg">
                  {currentFriend?.name?.charAt(0)}
                </Avatar>
              )}
            </span>
            <div className="name">{currentFriend?.name || "Name"}</div>
            <div className="optionIcons">
              <div>
                <IoSettingsOutline />
              </div>
              <div>
                <RiShareBoxLine />
              </div>
              <div>
                <BsChevronDown />
              </div>
              <div onClick={() => setChat((pre) => !pre)}>
                <VscChromeClose />
              </div>
            </div>
          </div>
          <div className="chatFeed">
            {!currentChat ? (
              <div className="nochat">Select a user to start a chat</div>
            ) : (
              messages.map((m) => (
                <div ref={scrollRef}>
                  <Messages data={m} currentUser={m.senderId === user._id} />
                </div>
              ))
            )}
          </div>
          <div className="input lastIcons">
            <div className="optionIcons">
              <div>
                <AiOutlineCamera />
              </div>
            </div>
            <div className="inputField">
              <TextField
                id="outlined-basic"
                label="Message"
                variant="outlined"
                value={newMessage}
                onKeyUp={(e) => {
                  if (e.keyCode === 13 && newMessage !== "") {
                    handleSendMessage();
                    console.log(e.keyCode);
                  }
                }}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
              />
            </div>
            <div className="optionIcons">
              <div>
                <AiOutlineGif />
              </div>
              <div>
                <GrEmoji />
              </div>
              <div onClick={handleSendMessage} style={{ marginLeft: "20px" }}>
                <AiOutlineCaretRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChatDiv>
  );
}

const ChatDiv = styled.div`
  /* display: none; */
  bottom: 10px;
  right: 30px;
  border-radius: 1em 1em 0 0;
  box-shadow: 0 0.125em 0.75em 0.125em rgba(20, 120, 120, 0.11);
  top: auto;
  position: fixed;
  overflow: hidden;
  background: none;
  z-index: 51;
  border: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")};
  border-bottom: none;
  .rootDiv {
    width: 530px;
    height: 420px;
    background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#1A1A1B")};
    display: flex;
    box-sizing: border-box;
  }

  .leftPart {
    height: 100%;
    -ms-flex: 1 0 30%;
    flex: 1 0 30%;
    max-width: 375px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;
    border-right: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")};
    background-color: rgba(179, 179, 179, 0.1);
    box-sizing: border-box;
    color: ${(props) => (props.isLight ? " #1c1c1c" : "#d7dadc")};

    .leftHeader {
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      padding: 0px 10px 0 15px;
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: left;
      border-bottom: 1px solid ${(props) => (props.isLight ? " #edeff1" : "#5e6368")};
    }
    .leftHeader > div:nth-child(1) {
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      position: relative;
    }
    .leftHeader input {
      outline: none;
      border: none;
      color: ${(props) => (props.isLight ? " #1c1c1c" : "#d7dadc")};
      background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#29292A")};
    }
    .leftHeader input::placeholder {
      color: ${(props) => (props.isLight ? " #1c1c1c" : "#d7dadc")};
    }
    .leftHeader > div:nth-child(2) {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
    .leftHeader .hidden {
      position: absolute;
      top: 26px;
      border: 1px solid ${(props) => (props.isLight ? "#ccc" : "#343536")};
      border-radius: 4px;
      padding: 5px;
      font-size: 14px;
      font-weight: 400;
      z-index: 70;
      background-color: ${(props) => (props.isLight ? "#FFFFFF" : "#29292A")};
    }
    .hiddenUser {
      border-bottom: 1px solid ${(props) => (props.isLight ? " #edeff1" : "#5e6368")};
      margin: 5px 0px;
      cursor: pointer;
    }
    .hiddenUser:hover {
      background: ${(props) =>
        props.isLight ? "rgba(82 75 75 / 10%)" : "rgba(255 255 255 / 10%)"};
    }
    .allChatrooms {
      box-sizing: border-box;
      overflow: auto;
      overflow-x: hidden;
      ::-webkit-scrollbar {
        width: 7px;
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
  }

  .rightPart {
    height: 100%;
    flex: 2 1 70%;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .rightHeader {
      padding: 0 1em;
      min-height: 2.625em;
      display: flex;
      position: relative;
      align-items: center;
      transition: all 0.3s;
      justify-content: space-between;
      border-bottom: 1px solid ${(props) => (props.isLight ? " #edeff1" : "#5e6368")};
      color: ${(props) => (props.isLight ? " rgb(26, 26, 27)" : "#d7dadc")};
    }
    .name {
      flex: 1 1 auto;
      overflow: hidden;

      display: flex;

      align-items: center;
    }
    .optionIcons {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .optionIcons > div {
      padding: 0;
      width: 16px;
      height: 16px;
      line-height: 16px;
      box-sizing: content-box;
      margin-left: 16px;
      cursor: pointer;
    }
    .optionIcons svg {
      fill: #878a8c;
      color: #878a8c;
      font-size: 16px;
    }
    .inputField {
      flex-grow: 1;
      margin-left: 15px;
      margin-bottom: -16px;
      padding: 5px 5px;

      .MuiOutlinedInput-root > input {
        padding: 5px 10px;
        color: ${(props) => (props.isLight ? " #1c1c1c" : "#d7dadc")};
      }

      label {
        top: -9px;
        color: ${(props) => (props.isLight ? " #1c1c1c" : "#d7dadc")};
      }
    }
    .input {
      width: 100%;
      box-sizing: border-box;
      flex-direction: row;
      display: flex;
      align-items: flex-end;
      margin-bottom: 12px;
      padding: 8px 16px 10px 5px;
      border-top: 1px solid ${(props) => (props.isLight ? " #edeff1" : "#5e6368")};
    }
    .lastIcons svg {
      font-size: 25px !important;
    }
    .chatFeed {
      padding: 20px 0px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: auto;
      overflow-x: hidden;
      ::-webkit-scrollbar {
        width: 7px;
      }
    }
    .nochat {
      text-align: center;
      color: ${(props) => (props.isLight ? " #1c1c1c" : "#d7dadc")};
      align-self: center;
      margin-top: 40%;
      opacity: 0.4;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .currentuserImage {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 5px;

    img {
      width: 100%;
      height: 100%;
    }
    .MuiAvatar-root {
      width: 23px;
      height: 22px;
      font-size: 15px;
    }
  }
`;
export { Chat };
