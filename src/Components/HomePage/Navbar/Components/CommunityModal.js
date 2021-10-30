import React, { useState } from 'react'
import styled from 'styled-components'
import { FaLock } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { HiEye } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import axios from "axios";
import Spinner from "react-spinkit";
import { useHistory } from 'react-router'
const CommunityModal = ({ setModalDisplay, modalDisplay }) => {

  const history = useHistory();
  const { user, token } = useSelector(state => state.auth);

  const [nameInput, setNameInput] = useState('')
  const [charLenght, setCharLenght] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  // handler
  const modalDisableHandler = (e) => {
    e.stopPropagation();
    if (e.target.id === 'communityModal') {
      setModalDisplay(false)

    }
  }

  const onChangeNameHandler = (e) => {
    setNameInput(e.target.value)

    if (e.target.value.length >= 21) {
      setCharLenght(21)
    } else {
      setCharLenght(e.target.value.length)
    }
  }
  const createCommunityHandler = () => {
    setIsLoading(true);
    const payload = {
      name: nameInput,
      userId: user._id
    }
    axios.post("https://reddit-new.herokuapp.com/community", payload, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setModalDisplay(false);
        history.push(`r/${res.data.community._id}`);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      })
    console.log(nameInput, user._id)
  }

  // styles
  const styleSpan = {
    background: '#FF585B',
    padding: '.3rem',
    fontSize: '80%',
    color: '#fff',
    borderRadius: '.5rem',
  }
  const styleSpanfont = {
    fontSize: '75%',
    color: '#8B8B8B',
  }

  modalDisplay ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";

  return (
    <StyledModal
      id="communityModal"
      onClick={modalDisableHandler}
      style={{ display: modalDisplay ? 'flex' : 'none' }}
    >
      <StyledModalContent>
        <button onClick={() => setModalDisplay(false)}>x</button>
        <h2>Create a community</h2>

        <StyleNameInput>
          <h3>Name</h3>
          <p>Community names including capitalization cannot be changed.</p>

          <div>
            <span>r/</span>{' '}
            <input
              onChange={onChangeNameHandler}
              value={nameInput}
              type="text"
            />
          </div>
          <p>{21 - charLenght} character remaining</p>
          {
            !nameInput &&
            <p>A community name is required</p>
          }
        </StyleNameInput>

        <StyleCommunityType>

          <h3>Community type</h3>
          <div>
            <input type="radio" value="Male" name="gender" /> <FaUser /> Public <span style={styleSpanfont}>Anyone can view, post, and comment to this community</span>
            <br />
            <input type="radio" value="Female" name="gender" /> <HiEye /> Restricted <span style={styleSpanfont}>Anyone can view this community, but only approved users can post</span>
            <br />
            <input type="radio" value="Other" name="gender" /> <FaLock /> Private <span style={styleSpanfont}>Only approved users can view and submit to this community</span>
          </div>

        </StyleCommunityType>

        <div>
          <h3>Adult content</h3>
          <input type="checkbox" />
          <span>
            {' '}
            <span style={styleSpan}>NSFW</span> 18+ year old community
          </span>
        </div>

        <div className="community-btns">
          <div>
            <button onClick={() => setModalDisplay(false)} className="cancel-btn">Cancel</button>
            <button onClick={createCommunityHandler}>Create Community</button>
          </div>
        </div>
      </StyledModalContent>
      {isLoading ? <AppLoading>
        <Spinner
          name="ball-spin-fade-loader"
          color="#0079D3"
          fadeIn="none"
        />
      </AppLoading> :
        null
      }
    </StyledModal>
  )
}
export default CommunityModal

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 520px;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`

const StyledModalContent = styled.div`
  position: relative;
  width: 560px;
  height: 535px;
  background: #fff;
  /* padding:1rem; */
  overflow: hidden;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  & > button {
    position: absolute;
    font-size: 110%;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    color: #333;
    outline: none;
    display: block;
    cursor: pointer;
    padding: 1rem;
    &:active {
      font-size: 120%;
    }
  }

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
const StyleNameInput = styled.div`
  & > div {
    height: 36px;
    border: solid 1px #ccc;
    border-radius: 0.2rem;
    margin-top: .8rem;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    & span {
      color: #7c7c7c;
    }

    &:hover {
      border: 1.5px solid #333;
    }
    & > input {
      width: 90%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 110%;
      color: #1c1c1c;
      font-weight: lighter;
    }
  }
`
const StyleCommunityType = styled.div`
overflow: hidden;
&>div{
    padding: 0;
    line-height: 1.5;
    & svg{
        color: #878A8C;
        margin-right: .5rem;
    }
@media only screen and (max-width: 700px) {
   & span {
    display: none;
  }
}
}
`
const AppLoading = styled.div`
width: 100vw;
height: 100vh;
position: absolute;
top: 0px;
left: 0px;
display: flex;
justify-content: center;
align-items: center;
`;

