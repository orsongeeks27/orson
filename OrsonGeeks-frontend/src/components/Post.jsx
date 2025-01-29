import React from 'react'
import PopupStyled from '../styled-components/AddPostStyles/PopupStyles'
import { Container } from '../styled-components/PostStyles'
const Post = () => {
  return (
    <PopupStyled>
        <Container>
        <img src="public\maheshbabu.jpeg"/>
        <div className='note'>
        <h2>Hello...Guys</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis officia alias perspiciatis magnam corrupti. Assumenda provident accusamus reiciendis eos vel molestias nesciunt quisquam, reprehenderit rem, temporibus debitis laborum molestiae dignissimos?</p>
        </div>
        </Container>
    </PopupStyled>

  )
}

export default Post