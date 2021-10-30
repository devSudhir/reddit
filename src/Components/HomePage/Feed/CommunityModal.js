import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from "axios";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import Spinner from "react-spinkit";
import { useHistory } from 'react-router'
import Avatar from '@material-ui/core/Avatar';
const CommunityModal = ({ setModalDisplay, modalDisplay,data }) => {

  const [votes, setVotes] = useState([]);

  // handler
  const modalDisableHandler = (e) => {
    e.stopPropagation();
    if (e.target.id === 'communityModal') {
      setModalDisplay(false)

    }
  }

  useEffect(() => {
    axios.get(`https://reddit-new.herokuapp.com/votes/post/${data._id}`)
      .then((res) => {
        setVotes(res.data.vote)
      console.log(res.data.vote)
      }).catch((err) => {
        console.log(err);
     })
  }, [modalDisplay]);


  return (
    <StyledModal
      id="communityModal"
      onClick={modalDisableHandler}
      style={{ display: modalDisplay ? 'flex' : 'none' }}
    >
      <StyledModalContent>
 
          <UserContainer>
            {votes.map((el) => {
              return <div>
                {el.value === 1 ?
                  <ImArrowUp style={{color:"#3D7FD5"}} />
                  :<ImArrowDown style={{color:"#D43D3D"}} />
                }
                <Avatar src={el.userId.profile_url} />
                <p>{el.userId.name }</p>
              </div>
            })}
          </UserContainer>
        <div className="community-btns">
          <div>
            <button onClick={() => setModalDisplay(false)} className="cancel-btn">Close</button>
          </div>
        </div>
      </StyledModalContent>
    </StyledModal>
  )
}
export default CommunityModal

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`

const StyledModalContent = styled.div`
  position: relative;
  width: 360px;
  min-height: 300px;
  background: #fff;
  /* padding:1rem; */
  overflow: hidden;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  & h2,
  h3 {
    font-size: 1rem;
    font-weight: 500;
    color: #1c1c1c;
  }
  & p {
    color: #7c7c7c;
    font-size: 12px;
    margin-bottom: 4px;
  }
  & > h2 {
    height: 3rem;
    padding: 1rem;
  }

  & h3 {
    margin-bottom: 8px;
  }

  & > div {
    padding: 1rem;
  }

  .community-btns {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;
    background: #d5d7d9;
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
      margin-right: .5rem;
    }
    .cancel-btn {
      color: #0079d3;
      background: transparent;
      margin-right: 1rem;
    }
  }
`

const UserContainer = styled.div`

&>div{
  display: flex;
  align-items:center;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  &>div{
    margin-left: 10px;
  }
  &>p{
    font-size: 15px;
    margin-left: 10px;
  }
}
`