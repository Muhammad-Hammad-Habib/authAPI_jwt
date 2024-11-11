import dotenv from "dotenv";
dotenv.config()
import userModel from "../models/user_data_mdl.js";
import bcrypt from "bcrypt"

class user_route_ctrl {
    static check = async (req, resp) => {
        resp.send("hello");
    }

    // Created users with hashed password and validation for email already exist.
    static add_user = async (req, resp) => {
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
                resp.send({
                    result: "1",
                    record: result,
                    message: "record successfully created"
                })
            } else {
                resp.send({
                    result: "0",
                    message: `Email Already Exist ${user_email}`
                })
            }
        } catch (error) {
            resp.send({
                result: "0",
                message: `Error in Catch ${error}`
            })
            console.log(`Add user function error ${error}`)
        }
    }
}
export default user_route_ctrl;