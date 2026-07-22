import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async(req, res , next)=>{
    try {
        const decision = await aj.protect(req);

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message : "Rate limit Exceeded . please try again later"});
            }else if(decision.reason.isBot()){
                return res.status(403).json({message :"Bot Access Denied"});
            }else{
                return res.status(403).json({message : "Access Denied By Security Policy "});
            }
        }
        // check for sproof bots
        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                message:"Malicious bot Activity detected",
                error : "Spoofed Bot Detected"
            })
        }
        next();
    } catch (error) {
        console.error("Arcjet Protection Error" , error);
        next()
    }
}
