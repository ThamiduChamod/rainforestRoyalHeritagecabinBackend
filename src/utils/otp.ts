import { OtpModel } from "../models/OTP"
import { sendOTPEmail } from "./mailer"

export const sendOtp = async (email: string): Promise<boolean> =>{

  await OtpModel.deleteMany({email})
  const otp = generateOTP()
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000)
  
  try {
    await OtpModel.create({email, otp, expiresAt})
    await sendOTPEmail(email, otp)
    return true
    // return res.status(201).json({status: 201, message:"OTP sended"})
  } catch (error: any) {
    return false
    // return res.status(500).json({message: `OTP Send fail ${error}`})
  }
}

export const verifyOtp = async (email: string, otp: any): Promise<boolean> =>{
  try {
    // OTP correct → delete it
    // await OtpModel.deleteMany({ email:email });
    await OtpModel.findOneAndUpdate(
      {email,otp},
      {isValid: true}
    )
    return true 
  } catch (error) {
    return false  
  }
}


export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
