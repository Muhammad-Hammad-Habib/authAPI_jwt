import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"
let email_transport
try {
    email_transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
} catch (error) {
    console.log(error)
}


export default email_transport