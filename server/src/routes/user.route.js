import express from 'express'
import { followUser, getCurrentUser, getUserProfile, syncUser, updateProfile } from '../controllers/user.controllers.js'
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router()

router.get("/profile/:username",getUserProfile);

// the syncUser will help us push the auth user to the db
router.post("/sync",protectRoute,syncUser)
// get current user
router.post("/me",protectRoute,getCurrentUser)
router.put("/profile", protectRoute, updateProfile);
// endpoint to fllow a user
router.post("/follow/:targetUserId",protectRoute,followUser)


export default router