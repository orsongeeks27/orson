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


const fetchUserPosts = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    res.json(user.posts);
    console.log(`Fetched posts for user ID: ${userId}`);
};


const createNewUser = (req, res) => {
    const { name, username, posts } = req.body;

    if (!name || !username) {
        return res.status(400).json({ message: "Name and username are required." });
    }

    const newUser = {
        id: users.length + 1,
        name,
        username,
        posts: [],
        discussions:[]
    };

    users.push(newUser);
    saveUsers(); 

    res.status(201).json({ message: "User created successfully.", user: newUser });
};

const modifyUser=(req,res)=>{
    const {name,username}=req.body
    const user=users.find((user) => user.id === parseInt(req.params.id));
    if(!user){
        return res.status(404).json({message:"User not found."});
        }
        user.name=name || user.name
        user.username=username || user.username
        saveUsers()
        res.json({message:"user details modified."});
    
}

const deleteUser= (req,res)=>{
        const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
        if (userIndex === -1) return res.status(404).send('User not found');
        
        users.splice(userIndex, 1);
        res.status(204).json({message:"deleted user"});
        saveUsers()

};

module.exports = { fetchUserPosts, createNewUser ,modifyUser,deleteUser};
