import React, { useState } from "react";
import styles from "./CommentBox.module.css";
import { GoBold } from "react-icons/go";
import { GoItalic } from "react-icons/go";
import { TiAttachmentOutline } from "react-icons/ti";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { IoCodeWorking } from "react-icons/io5";
import { ImSuperscript2 } from "react-icons/im";
import { ImNotification } from "react-icons/im";
import { MdTextFields } from "react-icons/md";
import { BsListUl } from "react-icons/bs";
import { BsListOl } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router";
import { loadData } from "../../utils/localStorage";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledDiv = styled.div`
  background: ${(props) => (props.isLight ? "#dae0e6" : "rgb(3,3,3)")};
  color: ${(props) => (props.isLight ? " #1a1a1b;" : "#d7dadc")};
  textarea {
    background-color: ${(props) =>
      props.isLight ? "rgb(255,255,255)" : "rgb(26,26,27)"};
    color: ${(props) =>
      props.isLight ? " rgb(26,26,27)" : "rgb(255,255,255)"};
      
  }
`;

const CommentBox = () => {
  const { isLight } = useSelector((state) => state.color);

  const { postId } = useParams();

  const [cmntBody, setCmntBody] = useState("");
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  // console.log(postId);

  function postCmnt() {
    // console.log(cmntBody);
    const token = loadData("token");
    const body = {
      text: cmntBody,
      postId,
      userId: user._id,
    };
    axios
      .post(`https://reddit-new.herokuapp.com/comments`, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(async (res) => {
        console.log(res.data.comment.text);
        let comm = await axios.get(
          `https://reddit-new.herokuapp.com/comments/${postId}`
        );
        console.log(comm.data.comment);
        setCmntBody("")
      })
      .catch((err) => {
        console.log(err.response);
        setCmntBody("")
      });

     
  }

  return (
    <>
      <StyledDiv isLight={isLight}>
        <div className={styles.cmnt_outer_box}>
          <div className={styles.cmnt_userName}>
            <span>Comment as <span style={{color:"rgb(0 147 255)"}}>{user.name}</span></span>
          </div>
          <div className={styles.cmnt_main_box}>
            <textarea
              name="cmnt"
              id="cmnt"
              //  cols="80"
              rows="10"
              placeholder="What are your thoughts?"
              onChange={(e) => setCmntBody(e.target.value)}
              value={cmntBody}
            ></textarea>
          
            <div className={styles.cmnt_tools}>
              <div className={styles.cmnt_tools_1}>      
               <span>
                <GoBold />
               </span>
               <span>
                <GoItalic />
               </span>
               <span>
                <TiAttachmentOutline />
               </span>
               <span>
                <AiOutlineStrikethrough />
               </span>
               <span>
               <IoCodeWorking />
               </span>
               <span>
                 <ImSuperscript2 />
               </span>
               <span>
                 <ImNotification />
               </span>
               <span>
                 <div style={{borderRight:"1px solid black"}}></div>
               </span>
               <span>
                <MdTextFields />
               </span>
               <span>
                <BsListUl />
               </span>
               <span>
                <BsListOl />
               </span>
               <span>
                <FiMoreHorizontal />
               </span>
               
              </div>
<div className={styles.cmnt_tools_2}>
             <div>
                  Markdown Mode
             </div>
             <div className={styles.btn} onClick={postCmnt}>
                  Comment
             </div>
</div>
            </div>
         </div>
      </div>
        
      </StyledDiv>
    </>
  );
};

export default CommentBox;
