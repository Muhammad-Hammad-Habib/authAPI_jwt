import express from "express";
const user_route = express.Router();
import user_route_ctrl from "../controllers/user_data_ctrl.js";


user_route.get("/user", user_route_ctrl.check)


export default user_route