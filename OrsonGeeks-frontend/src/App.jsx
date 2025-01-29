import { useState } from 'react'
import AddButtonStyle from './styled-components/AddButtonStyle'
import PopUp from './components/PopUp'
import GridContainer from './styled-components/Container'
import Post from './components/Post'
import { Link } from 'react-router-dom'
function App() {
      const [show, setShow] = useState(false)

  return (
    <>
      <GridContainer>
      {show  ? <PopUp/> : <Post/>}  
      <AddButtonStyle  onClick={() => setShow(!show)}>+</AddButtonStyle>
      </GridContainer>
      <Link to='/discussions'>Discussions</Link>
      <Link to='/profile'>Profile</Link>
      <Link to='/addpost'>Add Post</Link>
      <Link to='/users'>Users</Link>

    </>
  )
}

export default App
