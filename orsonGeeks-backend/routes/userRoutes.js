const express=require('express');
const router=express.Router();
const {usersData,userData,getPostById,createPost,modifyPost,deletePost}=require('../controllers/usersLoader.js');
const {fetchUserPosts,createNewUser,modifyUser,deleteUser}=require("../controllers/userPosts.js")
const {fetchUserDiscussions,getDiscussion,createNewDiscussion,deleteDiscussion}=require('../controllers/userDiscussions.js')
router.get('/',usersData);
router.get('/:id',userData)
router.post('/',createNewUser)
router.put('/:id',modifyUser)
router.delete('/:id',deleteUser)

router.get('/:id/posts',fetchUserPosts)
router.get('/:id/post/:postid',getPostById)
router.post('/:id/post/',createPost)
router.put('/:id/post/:postid',modifyPost)
router.delete('/:id/post/:postid',deletePost)

router.get('/:id/discussions',fetchUserDiscussions)
router.get('/:id/discussion/:discussionid',getDiscussion)
router.post('/:id/discussion',createNewDiscussion)
router.delete('/:id/discussion/:discussionid',deleteDiscussion)



module.exports=router;