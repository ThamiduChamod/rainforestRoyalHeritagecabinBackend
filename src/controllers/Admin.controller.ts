import { AuthRequest } from "../middleware/auth";
import { Request, Response } from "express";
import { Role, User } from "../models/User";
import { OtpModel } from "../models/OTP";
import bcrypt from "bcrypt"


export const authorRegister = async (req: AuthRequest, res:Response) =>{

    try{
        if(!req.user) {
            return res.status(401).json({message: "Unauthorized"})
        }
            console.log("method is run")
            const{ firstName, lastName, email, password } = req.body
            const role ="AUTHOR"
            
            console.log(req.body)
            console.log(firstName)
    
            if ( !firstName || !lastName || !email || !password || !role){
                return res.status(400).json({message:"All fields are required"})
            }
            console.log    
            const existingUser = await User.findOne({email})
            if(existingUser){
                res.status(400).json({message: "Email already register"})
                return
            }
    
            const isValidEmail = await OtpModel.findOne({email})
            if(!isValidEmail || !isValidEmail.isValid){
                return res.status(400).json({message:"Wrong Email"})
            }
    
            // OTP correct → delete it
            await OtpModel.deleteMany({ email});
    
    
            const hashedPassword = await bcrypt.hash(password, 10)
    
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                roles: [role]
            })
    
            await newUser.save()
    
            res.status(201).json({
                message: role === Role.AUTHOR?
                    "User registered successfully":"Admin registered successfully",
                data:{
                    id: newUser._id,
                    email: newUser.email,
                    roles: newUser.roles
                }
            })
        }catch(err: any){
            res.status(500).json({message: err?.message})
        }
}
