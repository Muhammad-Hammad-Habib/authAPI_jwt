import dotenv from "dotenv";
dotenv.config()
import userModel from "../models/user_data_mdl.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class user_route_ctrl {
    static check = async (req, resp) => {
        resp.send("hello");
    }

    // Created users with hashed password and validation for email already exist.
    static user_register = async (req, resp) => {
        try {
            const { user_name, user_password, user_email } = req.body;
            const record_exist = await userModel.findOne({
                user_email: user_email
            });
            if (!record_exist) {
                const hashed_pass = await bcrypt.hash(user_password, Number(process.env.SALT))
                const user_data = new userModel({
                    user_name: user_name,
                    user_password: hashed_pass,
                    user_email: user_email
                })
                const result = await user_data.save()
                // Generate JWT Token
                const token = jwt.sign({ userID: result.user_email }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
                resp.send({
                    status: "1",
                    token: token,
                    message: "record successfully created"
                })
            } else {
                resp.send({
                    status: "0",
                    message: `Email Already Exist ${user_email}`
                })
            }
        } catch (error) {
            resp.send({
                status: "0",
                message: `Error in Catch ${error}`
            })
            console.log(`Add user function error ${error}`)
        }
    }

    // validate and login
    static user_login = async (req, resp) => {
        try {
            const { user_password, user_email } = req.body;
            if (user_email.trim() && user_password.trim()) {
                const record_exist = await userModel.findOne({
                    user_email: user_email
                });
                if (record_exist) {
                    const check_pass = await bcrypt.compare(user_password, record_exist.user_password)
                    if (user_email == record_exist.user_email && check_pass) {
                        // Generate JWT Token
                        const token = jwt.sign({ userID: record_exist.user_email }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                        resp.send({
                            status: "1",
                            token: token,
                            message: `Successfully login`
                        })
                    } else {
                        resp.send({
                            status: "0",
                            message: "Wrong Password"
                        })
                    }
                } else {
                    resp.send({
                        status: "0",
                        message: `Email does not Exist ${user_email}`
                    })
                }
            } else {
                resp.send({
                    status: "0",
                    message: `Email or password is empty`
                })
            }

            // resp.send(req.body)
        } catch (error) {
            console.log(`User Login Error ${error}`)
        }
    }
}

export default user_route_ctrl;