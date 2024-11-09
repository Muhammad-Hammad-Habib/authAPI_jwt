import userModel from "../models/user_data_mdl.js";

class user_route_ctrl {
    static check = async (req, resp) => {
        resp.send("hello");
    }
}

export default user_route_ctrl;