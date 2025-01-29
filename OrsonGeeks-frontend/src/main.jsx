import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddUser from './components/AddUser.jsx'
import App from './App.jsx'
import Users from './components/Users.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/discussions',
    element: <div>Discussions page</div>,
    errorElement:<h1>404 Not Found</h1>,

  },
  {
    path: '/profile',
    element: <div>profile</div>,
    errorElement:<h1>404 Not Found</h1>,

  }
  ,
  {
    path: '/addpost',
    element: <div>Add post</div>,
    errorElement:<h1>404 Not Found</h1>,

  }
  ,
  {
    path: '/users',
    element: <Users/>,
    errorElement:<h1>404 Not Found</h1>,
  },
      {
        path:'AddUser',
        element:<AddUser/>
      }
    

  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
