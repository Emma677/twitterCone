export const protectRoute = async(req,res,next)=>{
    if(!req.auth().isAuthenticated){
        return res.status(401).json({message:"Unauthorized - user must be logged in"})
    }
    next()
}


// the code above is a simple function that checks whether a user has been is logged in or not
// clerk will be used in handling the authentication