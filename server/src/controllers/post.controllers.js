import asyncHandler from "express-async-handler";
import Post from '../models/post.model.js'
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary.js";
import Notification from "../models/notification.model.js";
import Comment from "../models/comment.model.js";


export const getPosts = asyncHandler(async (req,res)=>{
    const posts = await Post.find()
    .sort({createdAt: -1})
    .populate("user","username firstName lastName profilePicture")
    .populate({
        path:'comments',
        populate:{
            path: "user",
            select: "username firstName lastName profilePicture"
        }
    })
    res.status(200).json({posts})

});

export const getPost = asyncHandler(async (req,res)=>{
    const {postId} = req.params;

    const post = await Post.findById(postId)
    .populate('user', "username firstName lastName profilePicture")
   .populate({
        path:'comments',
        populate:{
            path: "user",
            select: "username firstName lastName profilePicture"
        }
    })

    if(!post) return res.status(404).json({error: "Post not found"})

    res.status(200).json({post})
})


export const getUserPosts = asyncHandler(async(req,res)=>{
    const {username} = req.params

    const user = await User.findOne({username});
    if(!user) return res.status(400).json({error:'user not found'})

    const posts = await Post.find({user: user._id})
    .sort({createdAt:-1})
    .populate("user", "username firstName lastName profilePicture")
    .populate({
        path:"comments",
        populate:{
            path:"user",
            select:"username firstName lastName profilePicture"
        }
    })
    res.status(200).json({posts})
})


export const createPost = asyncHandler(async (req,res)=>{
    const {userId} = getAuth(req)
    const {content} = req.body;
    const imageFile = req.file;

    if(!content && !imageFile){
        return res.status(400).json({error: "post must contain either a text or image"})
    }


    const user = await User.findOne({clerkId: userId});
    if(!user) return res.status(404).json({error: 'user not found'})

        // store the image to cloudinary
    let imageUrl = "";
    if(imageFile){
        try {
            const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
                "base64"
            )}`

            const uploadResponse = await cloudinary.uploader.upload(base64Image,{
                folder: 'social_media_posts',
                resource_type: 'image',
                transformation: [
                    {width: 800, height: 600, crop:'limit'},
                    {quality: 'auto'},
                    {format: "auto"}
                ],
            }),
            imageUrl = uploadResponse.secure_url;
        } catch (uploadError) {
            console.error('Cloudinary upload error:' ,uploadError);
            return res.status(400).json({error: 'failed to upload image'})
        }
    }

    // now create the post
    const post = await Post.create({
        user:user._id,
        content: content || "",
        image: imageUrl
    })

     res.status(201).json({post})
})


export const likePost = asyncHandler(async (req,res)=>{
    const {userId} = getAuth(req)
    const {postId} = req.params;

    const user = await User.findOne({clerkId: userId});
    const post = await Post.findById(postId);

    if(!user || !post) return res.status(404).json({error: "user or post not found"})

        const isLiked = post.likes.includes(user._id);

        if(isLiked){
            //unlike
            await Post.findByIdAndUpdate(postId,{
                $pull:{likes: user._id}
            })
        }else{
            //like
            await Post.findByIdAndUpdate(postId,{
                $push: {likes: user._id}
            })
        }

        // notification if not liking our own post
        if(post.user.toString() !== user._id.toString()){
            await Notification.create({
                from: user._id,
                to: post.user,
                type: "like",
                post:postId
            })
        }
        res.status(200).json({
            message: isLiked ? "Post unliked" : "Post likes"
        })
})

export const deletePost = asyncHandler(async (req,res)=>{
    const {userId} = getAuth(req)
    const {postId} = req.params

    const user = await User.findOne({clerkId: userId})
    const post = await Post.findById(postId)

    if(!user || !post) return res.status(404).json({message:'user or post not found'});

    if(post.user.toString() !== user._id.toString()){
        return res.status(403).json({error: "You can delete post created by you"})
    }

    //delete all comments
    await Comment.deleteMany({post: postId});


    //delete the post
    await Post.findByIdAndDelete(postId);
    res.status(200).json({message: 'post deleted'})
})