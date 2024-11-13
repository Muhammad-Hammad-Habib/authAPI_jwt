import dotenv from "dotenv";
dotenv.config()
import userModel from "../models/user_data_mdl.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class user_route_ctrl {
    static get_loggedIn_user_data = async (req, resp) => {
        resp.send(req.user_record);
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
                const token = jwt.sign({ userID: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
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
                message: `Add user function error ${error}`
            })
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
                        const token = jwt.sign({ userID: record_exist._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
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
        } catch (error) {
            resp.send({
                status: "0",
                message: `User Login Error ${error}`
            })
        }
    }

    // Change your password.
    static change_password = async (req, resp) => {
        try {
            const { user_password, confirm_password } = req.body;
            if ((user_password.trim() != "" && confirm_password.trim() != "")) {
                if ((user_password === confirm_password)) {
                    const hashed_pass = await bcrypt.hash(user_password, Number(process.env.SALT))
                    await userModel.findByIdAndUpdate(req.user_record._id, { user_password: hashed_pass })
                    resp.send({
                        status: "1",
                        message: `Password Successfully Updated`
                    })

                } else {
                    resp.send({
                        status: "0",
                        message: `Password & Confirm Password must be same`
                    })
                }
            } else {
                resp.send({
                    status: "0",
                    message: `Password & Confirm Password Required`
                })
            }

        } catch (error) {
            resp.send({
                status: "0",
                message: `Change Password error ${error}`
            })
        }

    }
    static forgget_password = async (req, resp) => {
        try {
            const email = req.body.user_email
            if (email.trim() != "") {
                const record_exist = await userModel.findOne({
                    user_email: email
                });
                resp.send(record_exist)
            } else {
                resp.send({
                    status: "0",
                    message: `Email required to change password`
                })
            }
        } catch (error) {
            resp.send({
                status: "0",
                message: `Change Password error ${error}`
            })
        }
    }
}

export default user_route_ctrl;