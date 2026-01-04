import dotenv from "dotenv"
import { NextFunction, Response, Request } from "express"
import jwt from "jsonwebtoken"
dotenv.config()


const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthRequest extends Request {
    user?: any
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message:"No Token Provide"})
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1] //[Bearer]
    try{
        
        const payload =jwt.verify(token, JWT_SECRET)
        console.log(`payload`)
        req.user = payload
        next()
    }catch (err){
        res.status(401).json({message: "Invalid or expire token"})
    }
}