import ratelimit from "../Config/Upstash.js"

const RateLimiter=async(req,res,next)=>{
    try{
        const {success}=await ratelimit.limit("My-Limit-Key");
        if(!success){
            return res.status(429).json({message:"Too many requests,please try again later."});
        }
        next();
    }
    catch(error){
        console.log("Rate Limit Error",error);
        next(error)
    }
}

export default RateLimiter;