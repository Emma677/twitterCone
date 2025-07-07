import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async(req,resizeBy,next) =>{
    try {
        const decision = await aj.protect(req,{
            requested: 1,
        })
 
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({
                    error: "Too many requests",
                    message: "Rate limit exceeded. Please try again"
                });
            }else if(decision.reason.isBot()){
                 return res.status(403).json({
                    error: "Bot access denied",
                    message: "Automated requests are not allowed"
                });
            }else{
                 return res.status(403).json({
                    error: "forbidden",
                    message: "Access denied by security policy"
                });
            }
        }

        // check for spoofed bots
        if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
            return res.status(403).json({
                error: "Spofed bot detected",
                message: "Malicious bot activity detected"
            })
        }
        next()
    } catch (error) {
        console.error("Arcjet middleware error:",error);
        next()
    }
}