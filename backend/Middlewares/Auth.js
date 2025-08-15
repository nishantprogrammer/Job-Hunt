import { User } from "../Models/User.js";
import JWT from 'jsonwebtoken'
export const isauthenticated = async (req,res,next)=>
{
   try {
     const token = req.cookies.token
    if(!token)
    {
        return res.status(200).json({message:"Login First"})
    }
    const decode = JWT.verify(token,process.env.SECRET_KEY)
    const userId = decode.tokendata
    let user = await User.findById(userId)
    if(!user)
    {
        return res.status(200).json({message:"Invalid Token"})
    }
    req.user=userId
    next();

    
   } catch (error) {
    console.log(error)

    
   }
    
}