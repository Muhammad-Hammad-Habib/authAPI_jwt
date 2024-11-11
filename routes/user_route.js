import express from "express";
const user_route = express.Router();
import user_route_ctrl from "../controllers/user_data_ctrl.js";


user_route.get("/user", user_route_ctrl.check)
user_route.post("/add_user", user_route_ctrl.add_user)


export default user_route