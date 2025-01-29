import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserProfileContainer } from '../styled-components/UserProfileStyles';
import { Link,Outlet } from 'react-router-dom';

const Users = () => {
    const [posts, setPosts] = useState([]);
    const [editId, setEditId] = useState(null); 
    const [content, setContent] = useState('');

    const deleteProfile = (id) => {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== id));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    const editProfile = (id, name) => {
        setEditId(id);
        setContent(name);
    };

    const saveContent = () => {
        axios.put(`http://localhost:3000/users/${editId}`, { name: content })
            .then(() => {
                setPosts(posts.map(post =>
                    post.id === editId ? { ...post, name: content } : post
                ));
                setEditId(null); 
                setContent('');
            })
            .catch(error => {
                console.error('Error saving content:', error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <>
            {posts.map(post => (
                <UserProfileContainer key={post.id}>
                    <img
                        src="public/mahesh_babu_keerthy_suresh_ilez_badurgov_duy_beck_hd_sarkaru_vaari_paata.jpg"
                        alt={post.name}
                        />
                    <h2>{post.username}</h2>
                    {editId === post.id ? (
                        <textarea
                        value={content}
                            onChange={(e) => setContent(e.target.value)}
                            />
                        ) : (
                            <p>{post.name}</p>
                        )}
                    <button onClick={() => deleteProfile(post.id)}>Delete</button>
                    {editId === post.id ? (
                        <button onClick={saveContent}>Save</button>
                    ) : (
                        <button onClick={() => editProfile(post.id, post.name)}>Edit</button>
                    )}
                </UserProfileContainer>
            ))}
            <Link to="/AddUser">Create New</Link>
            
        </>
    );
};

export default Users;
