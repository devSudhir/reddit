import React from 'react'
import styled from 'styled-components'

const PostInput = () => {
  return (
    <StylePostInput >
      <textarea cols="70" rows="10" placeholder="Text (optional)"></textarea>
    </StylePostInput>
  )
}

const StylePostInput = styled.div`
 padding: 0 .4rem;
  & > textarea {
    margin-top: 1rem;
    width: 100%;
    border: solid 1px #ccc;
    outline: none;
    border-radius: 0.2rem;
    padding: 1rem;
    &:hover {
      border: solid 1px #000;
    }
  }
`

export default PostInput
