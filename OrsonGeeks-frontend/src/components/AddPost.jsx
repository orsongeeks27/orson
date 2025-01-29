import React from 'react'
import { NoteContainer,MediaContainer,SendButton } from '../styled-components/AddPostStyles/AddStyles'
const AddPost = () => {
  return (
    <>
    <NoteContainer>

        <input type='text' className='Title' placeholder='Title'/>
        < textarea className='des' placeholder='Note'/>
        <button className='paste'>=</button>
        </NoteContainer>
        <MediaContainer>
          <div className='media'>
            <img src="public\maheshbabu.jpeg"/>
            <img src="public\mahesh_babu_keerthy_suresh_ilez_badurgov_duy_beck_hd_sarkaru_vaari_paata.jpg"/>
            </div>
            <div className="buttons">
            <button> &#9746;</button> 
            <button>+</button>
            </div>
        <SendButton>SEND</SendButton>
        </MediaContainer>
    </>
  )
}

export default AddPost