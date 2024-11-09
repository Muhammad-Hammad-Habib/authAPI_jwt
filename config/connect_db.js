import mongoose from "mongoose"
const connect_db = async () => {
    try {
        const URL = process.env.URL
        const data_base = {
            dbName: process.env.DATABASE
        }
        await mongoose.connect(URL,data_base)

    } catch (error) {
        console.log(`Error in connection ${error}`)
    }
}
export default connect_db;