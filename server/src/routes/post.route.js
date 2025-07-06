import express from "express"
import {createPost, deletePost, getPost, getPosts, getUserPosts, likePost} from '../controllers/post.controllers.js'
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// public routes
router.get('/',getPosts); // multiple post
router.get('/:postId',getPost) //singlePost
router.get("/user/:username", getUserPosts) // userPost depending on the username

// protected routes
// the upload will handle image upload
router.post("/",protectRoute,upload.single('image'),createPost)
router.post('/:postId/like',protectRoute,likePost)
router.delete('/:postId',protectRoute,deletePost)

export default router 