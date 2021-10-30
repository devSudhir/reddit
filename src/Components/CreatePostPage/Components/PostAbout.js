import React from 'react'
import styled from 'styled-components'
import PostCard from './PostCard'
import ProfileCard from './ProfileCard'

const PostAbout = () => {
    return (
        <StyledAbout>
            <ProfileCard/>
            <PostCard/>
            <div>
            <p>Please be mindful of reddit's <span>content policy</span> 
            </p>
            <p>
                and practice good <span>reddiquette.</span> 
            </p>
            </div>
        </StyledAbout>
    )
}
const StyledAbout = styled.div`
height: 700px;
display: flex;
flex-direction: column;
width: 100%;
&>div{padding: 1rem; margin: 1rem 0}
&>div>p{
    color: #7C7C7C;
    padding: 0;
    margin: 0;
    font-size: .9rem;
    font-weight: 500;
    &>span{
        color:#0079D3;
    }
}
`

export default PostAbout
