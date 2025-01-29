const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "user.json");
let users = [];


const loadUsers = () => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        users = JSON.parse(data);
        console.log("Users loaded successfully.");
    } catch (err) {
        console.error("Error loading users:", err);
        users = []; 
    }
};


const saveUsers = () => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        console.log("Users saved successfully.");
    } catch (err) {
        console.error("Error saving users:", err);
    }
};


loadUsers();


const usersData = (req, res) => {
    res.json(users);
};


const userData = (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json(user);
};




const fetchUserPosts = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (!user) return res.status(404).json({ message: "User not found." });

    res.json(user.posts);
};


const createPost = (req, res) => {
    const { id } = req.params;
    const { title, content, journal, prev } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
    }

    const user = users.find(user => user.id === parseInt(id));
    if (!user) return res.status(404).json({ message: "User not found." });

    const newPostId = user.posts.length > 0 ? user.posts[user.posts.length - 1].id + 1 : 1;

    const newPost = {
        postId: newPostId,
        title,
        content,
        journal: journal || false,
        prev: prev || {}
    };

    user.posts.push(newPost);
    saveUsers();

    res.status(201).json({ message: "Post created successfully.", post: newPost });
};

// Get a specific post by ID
// const getPostById = (req, res) => {
//     const { id, postid } = req.params;
//     const user = users.find(user => user.id === parseInt(id));

//     if (!user) return res.status(404).json({ message: "User not found." });

//     const post = user.posts.find(post => post.id === parseInt(postid));
//     if (!post) return res.status(404).json({ message: "Post not found." });

//     res.json(post);
// };

const getPostById = (req, res) => {
    const { id, postid } = req.params;
  
    try {
      
      const user = users.find(user => user.id === parseInt(id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const post = user.posts.find(post => post.postId === parseInt(postid));
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      let connectedPosts = [post];
  
      let prevPost = post;
      while (prevPost.prev?.postId) {
        const prevUser = users.find(user => user.username === prevPost.prev.username);
        if (prevUser) {
          const prevPostItem = prevUser.posts.find(p => p.postId === prevPost.prev.postId);
          if (prevPostItem) {
            connectedPosts.unshift(prevPostItem); 
            prevPost = prevPostItem; 
          } else {
            break; 
          }
        } else {
          break; 
        }
      }
  
      res.json(connectedPosts);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  


const modifyPost = (req, res) => {
    const { id, postid } = req.params;
    const { title, content } = req.body;

    const user = users.find(user => user.id === parseInt(id));
    if (!user) return res.status(404).json({ message: "User not found." });

    const post = user.posts.find(post => post.postId === parseInt(postid));
    if (!post) return res.status(404).json({ message: "Post not found." });

    post.content = content || post.content;
    saveUsers();

    res.json({ message: "Post updated successfully." });
};


const deletePost = (req, res) => {
    const { id, postid } = req.params;
    const user = users.find(user => user.id === parseInt(id));

    if (!user) return res.status(404).json({ message: "User not found." });

    const postIndex = user.posts.findIndex(post => post.postId === parseInt(postid));
    if (postIndex === -1) return res.status(404).json({ message: "Post not found." });

    user.posts.splice(postIndex, 1);
    res.json({ message: `Post ${postid} deleted successfully.` });
    saveUsers();

};


module.exports = { 
    usersData, 
    userData, 
    fetchUserPosts, 
    createPost, 
    getPostById, 
    modifyPost, 
    deletePost 
};
