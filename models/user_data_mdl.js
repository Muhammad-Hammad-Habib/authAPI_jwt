import mongoose from "mongoose";
const user_schema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    user_password: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const userModel = new mongoose.model("user_data", user_schema)

export default userModel;