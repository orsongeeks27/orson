import React,{useState} from 'react'
import PopupStyled,{SelectionStyle} from '../styled-components/AddPostStyles/PopupStyles'
import AddPost from './AddPost'
import AddDiscuss from './AddDiscuss'

const PopUp = () => {
    const [content,setContent]=useState("post")
  return <>
    <PopupStyled>
    {/* <button class="back">Back</button> */}
    <SelectionStyle content={content}>
        <button onClick={() => setContent("post")}>POST</button>
        <button onClick={() => setContent("discuss")}>DISCUSS</button>
        </SelectionStyle>
        {content === "post" && <><h1>Hi friends</h1><AddPost/></>}
        {content === "discuss" && <AddPost/>}
    </PopupStyled>
  </>
}

export default PopUp