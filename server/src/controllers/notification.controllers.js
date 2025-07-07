import { getAuth } from "@clerk/express";
import asyncHander from "express-async-handler";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getNotification = asyncHander(async (req,res)=>{
    const  {userId} = getAuth(req)

    const user = await User.findOne({clerkId: userId})

    if(!user) return res.status(404).json({message: 'user not found'})

        const notifications = await Notification.find({to: user._id})
        .sort({createdAt: -1})
        .populate("from", "username firstName lastName profilePicture" )
        .populate("post", "content image")
        .populate('comment', 'content')

        res.status(200).json({notifications})
})

export const deleteNotification = asyncHander(async (req,res)=>{
       const  {userId} = getAuth(req)
       const {notificationId} = req.params

       const user = await User.findOne({clerkId: userId});
        if(!user) return res.status(404).json({message:'user not found'})

       const notification = await Notification.findOneAndDelete({
        _id: notificationId,
        to: user._id
       })
         if(!notification) return res.status(404).json({message:'notification not found'})

            res.status(200).json({message:'notification deleted'})
})