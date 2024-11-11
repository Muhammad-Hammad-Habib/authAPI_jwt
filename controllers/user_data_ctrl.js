import userModel from "../models/user_data_mdl.js";

class user_route_ctrl {
    static check = async (req, resp) => {
        resp.send("hello");
    }
    static add_user = async (req, resp)=>{
        resp.send(req.body)
    }
}

export default user_route_ctrl;