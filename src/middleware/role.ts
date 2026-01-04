import { NextFunction, Response } from "express";
import { Role } from "../models/User";
import { AuthRequest } from "./auth";

export const requireRole = (roles: Role[]) =>{
    return (req: AuthRequest, res: Response, next: NextFunction) =>{
console.log("role.ts", req)
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"})
        }
        
    
console.log("role.tssss")
        const hasRole = roles.some((role) => req.user.role?.includes(role))
        console.log(hasRole)
        if (!hasRole){
            return res.status(405).json({message: `Require ${roles} role`})
        }
console.log("role.ts done")
        next()
    }
}