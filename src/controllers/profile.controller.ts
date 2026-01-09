import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { ProfileModel } from "../models/profile";
import cloudinary from "../config/cloudinary";


export const saveProfile = async (req:AuthRequest, res: Response)=>{
    
    try {
        if(!req.user.sub){
            return res.status(400).json({isSave: false, message:"Unauthorized"})
        }
console.log("method 2")
        const {address, phone, country} = req.body

        if(!address || !phone || !country){
            return res.status(400).json({isSave: false, message:"All are require"})
        }
console.log("method 1")
        const exitProfile = await ProfileModel.findOne({user:req.user.sub})
        if(exitProfile){

            exitProfile.address = address
            exitProfile.phone = phone
            exitProfile.country= country

            exitProfile.save()

            res.status(200).json({ isSave: true, message:"User Profile update successfully"})
            return
        }

        
console.log("method 3")        
        const profile = new ProfileModel({
            user:req.user.sub,
            image:'',
            address,
            phone,
            country
        })

        await profile.save()

        res.status(200).json({isSave: true,message:"User profile save successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({isSave: false,message:"profile save fail"})
    }
}

export const updatePhoto = async (req:AuthRequest, res: Response) =>{
    if(!req.user) {
            return res.status(401).json({isSave: false,message:"Unauthorized"})
        }
        try {
            let imageURL = ''
            
            const exitProfile = await ProfileModel.findOne({user:req.user.sub})
            if(!exitProfile){
                res.status(400).json({message:"First add other details"})
                return
            }

            if(req.file){
                const result: any = await new Promise((resole, reject) =>{
                    const upload_stream = cloudinary.uploader.upload_stream(
                    {folder: "profileImage"},
                    (error, result) => {
                        if(error){
                            console.error("image Not save",error)
                            return reject(error)
                        }
                        resole(result)
                    }
                    )
                    upload_stream.end(req.file?.buffer)
                })
                
                imageURL = result.secure_url
                console.log(imageURL)
            }

            exitProfile.image = imageURL

            await exitProfile.save()

            res.status(200).json({ isSave:true, image: imageURL, message:"image upload successfully"})

        } catch (error) {
            res.status(400).json({message:"image upload fail"})
        }
}

export const getMyProfile = async (req: AuthRequest, res: Response)=>{
    if(!req.user) {
        return res.status(401).json({isSave: false,message:"Unauthorized"})
    }
    console.log("run 1")
    try {
        const profile = await ProfileModel.findOne({user:req.user.sub})
        console.log("run 2")
        if(!profile){
            res.status(400).json({message:"can't find profile"})
        }
        console.log("run 3")
        res.status(200).json({message:"find profile", data:profile})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"can't find profile"})
    }
}