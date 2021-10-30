import React from 'react'
import CreatePost from './Components/CreatePost'
import PostAbout from './Components/PostAbout'
import styled from 'styled-components'

const CreatePostPage = () => {
    return (<>
        <StyledPage>
            <CreatePost />
            <PostAbout />
        </StyledPage>
    </>
    )
}
export default CreatePostPage

const StyledPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  padding: 40px 90px;
  background-color: #dae0e6;
  &>div{
      padding: 1rem;
      border-radius: .5rem;
      width: 740px;
      margin-right: 1rem;
  }
  &>div+div{
      padding: 0;
      width: 315px;
  }
`
