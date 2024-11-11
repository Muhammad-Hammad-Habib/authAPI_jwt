import express from "express";
const user_route = express.Router();
import user_route_ctrl from "../controllers/user_data_ctrl.js";


user_route.get("/user", user_route_ctrl.check)
user_route.post("/user_register", user_route_ctrl.user_register)
user_route.post("/user_login", user_route_ctrl.user_login)


export default user_route