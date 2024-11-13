import dotenv from "dotenv";
dotenv.config()
import jwt from "jsonwebtoken"
import userModel from "../models/user_data_mdl.js";

const verify_jwt_auth = async (req, resp, next) => {
    try {
        const { authorization } = req.headers
        if (authorization) {
            const token = authorization.split(" ")[1];
            const fatch_id = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const record = await userModel.findById(fatch_id.userID).select("-user_password")
            if (record != null) {
                req.user_record = record
                next()
            } else {
                resp.send({
                    status: "0",
                    message: `Record Does not Exist`
                })
            }
        } else {
            resp.send({
                status: "0",
                message: `Token Required`
            })
        }
    } catch (error) {
        resp.send({
            status: "0",
            message: `Verify token Error ${error}`
        })
    }
}
export { verify_jwt_auth }