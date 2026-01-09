import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD

    }
})

export const sendOTPEmail = async (email: string, otp: string) =>{
    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        html:`
            <h2>Your OTP: ${otp}</h2>
            <p>This OTP is valid for 2 minutes.</p>
        `
    })
}

export const sendEmail = async (email: string, name: string, subject: string, message: string) => {
    try {
        await transporter.sendMail({
            
            from: `"${name}" <${process.env.GMAIL_USER}>`, 
            to: process.env.GMAIL_USER, 
            replyTo: email, 
            subject: `Contact Form: ${subject}`,
            
            html: `
                <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
                    <div style="background-color: #2563eb; padding: 20px; color: white; text-align: center;">
                        <h2 style="margin: 0; font-size: 20px; text-transform: uppercase;">New Inquiry Received</h2>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff; color: #334155;">
                        <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
                        <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
                        <p style="margin-bottom: 20px;"><strong>Subject:</strong> ${subject}</p>
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #2563eb;">
                            <p style="margin: 0; line-height: 1.6;">${message}</p>
                        </div>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
                        This email was sent from your website's contact form.
                    </div>
                </div>
            `
        });

        console.log("✅ Email sent to admin");
        return true;
    } catch (error) {
        console.error("❌ Nodemailer Error:", error);
        return false;
    }
};