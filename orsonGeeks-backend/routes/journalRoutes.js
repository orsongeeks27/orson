const fs=require('fs')
const path=require('path')
const express=require('express')
const router=express.Router()
const userFile = path.join(__dirname, "..", "data", "user.json");
const journalFile = path.join(__dirname, "..", "data", "journal.json");


const readJsonFile = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    return [];
  }
};


const writeJsonFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
};


router.get("/", (req, res) => {
  const journalPosts = readJsonFile(journalFile);
  res.json(journalPosts);
});


router.post("/:userId/:postId", (req, res) => {
  const { userId, postId  } = req.params;
  if (!userId || !postId) {
    return res.status(400).json({ error: "userId and postId are required" });
  }

  const users = readJsonFile(userFile);
  const journalPosts = readJsonFile(journalFile);

  const user = users.find((u) => u.id === parseInt(userId));
  if (!user) return res.status(404).json({ error: "User not found" });

  const post = user.posts.find((p) => p.postId === parseInt(postId));
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (journalPosts.find((p) => p.id === parseInt(postId) && user.id === parseInt(userId))) {
    return res.status(400).json({ error: "Post already exists in journal for this user" });
  }

  post.journal = true;
  journalPosts.push({ ...post, userId: parseInt(userId) });
  writeJsonFile(journalFile, journalPosts);
  writeJsonFile(userFile, users);

  res.json({ message: "Post added to journal", post });
});


router.delete("/:userId/:postId", (req, res) => {
  const { userId, postId } = req.params;
  if (!userId || !postId) {
    return res.status(400).json({ error: "userId and postId are required" });
  }

  let journalPosts = readJsonFile(journalFile);
  const postExists = journalPosts.some((post) => post.id === parseInt(postId) && post.userId === parseInt(userId));

  if (!postExists) {
    return res.status(404).json({ error: "Post not found in journal for this user" });
  }

  journalPosts = journalPosts.filter((post) => !(post.id === parseInt(postId) && post.userId === parseInt(userId)));
  writeJsonFile(journalFile, journalPosts);

  const users = readJsonFile(userFile);
  const user = users.find((u) => u.id === parseInt(userId));
  if (user) {
    const post = user.posts.find((p) => p.postId === parseInt(postId));
    if (post) post.journal = false;
  }
  writeJsonFile(userFile, users);

  res.json({ message: "Post removed from journal and updated in user.json" });
});


module.exports=router
