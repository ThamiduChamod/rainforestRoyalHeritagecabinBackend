import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import cloudinary from "../config/cloudinary";
import { RoomModel } from "../models/Room";

export const saveRoom = async (req: AuthRequest, res: Response) =>{
    try {
        if(req.user) {
            return res.status(401).json({message:"Unauthorized"})
        }

        const{type, price, status, pax, bedType, amenities, count} = req.body
        let imageURL = ''

        if(req.file){
            const result: any = await new Promise((resole, reject) =>{
                const upload_stream = cloudinary.uploader.upload_stream(
                    {folder: "imageRoom"},
                    (error, result) => {
                        if(error){
                            console.error(error)
                            return reject(error)
                        }
                        resole(result)
                    }
                )
                upload_stream.end(req.file?.buffer)
            })
            imageURL = result.secure_url
        }

        const newRoom = new RoomModel({
            type,
            price,
            status,
            pax,
            bedType,
            amenities,
            image:imageURL,
            count
        })
        try {
            await newRoom.save()
            res.status(201).json({
                 message: "Save Room",
                data: newRoom
            })
        } catch (error) {
            res.status(500).json({message:`${error}`})
        }
    } catch (error) {
        res.status(500).json({message:`${error}`})
    }
}