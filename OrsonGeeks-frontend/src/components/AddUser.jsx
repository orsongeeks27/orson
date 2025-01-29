import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AddUser = () => {
    const navigate=useNavigate()
const [posts,setPosts]=useState([])
const [name,setName]=useState('')
const [content,setContent]=useState('')

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);
  return <>
  <input type='text' onChange={(e) => setName(e.target.value)}/>
    <textarea onChange={(e) => setContent(e.target.value)}/>
        <button onClick={() => {
            axios.post('http://localhost:3000/users', {
                name: name,
                username:content}).then( navigate('/users') )
                }}>Add User</button>
  </>
}

export default AddUser