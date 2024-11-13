import express from "express";
const user_route = express.Router();
import user_route_ctrl from "../controllers/user_data_ctrl.js";
import { verify_jwt_auth } from "../auth_middleware/auth_mdlwre_std.js"

// apply middleware 
user_route.use("/change_password", verify_jwt_auth)
user_route.use("/get_Login_user_data", verify_jwt_auth)


// public API (No need JWT)
user_route.post("/user_register", user_route_ctrl.user_register)
user_route.post("/user_login", user_route_ctrl.user_login)
user_route.post("/forgget_password", user_route_ctrl.forgget_password)

// Privte API (need JWT Verification)\
user_route.post("/change_password", user_route_ctrl.change_password)
user_route.get("/get_Login_user_data", user_route_ctrl.get_loggedIn_user_data)



export default user_route