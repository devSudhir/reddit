import React from 'react'
import styled from 'styled-components'

const LinkInput = () => {
  return (
    <StyleLinkInput >
      <textarea placeholder="Url" rows="1"></textarea>
    </StyleLinkInput>
  )
}

const StyleLinkInput = styled.div`
 padding: 0 .4rem;
 &>textarea{
  margin-top: .5rem;
  width: 100%;
  padding: .5rem 1rem;
  outline: none;
  border-radius: .4rem;
  overflow-x: hidden; 
  overflow-wrap: break-word;
  border: .5px solid #ccc;
  height: 100px;
  &:hover{
    border: .5px solid #333;
  }
  &::placeholder{
    font-size: 1rem;
    color: #878A8C;
  }
 }
 
`

export default LinkInput
