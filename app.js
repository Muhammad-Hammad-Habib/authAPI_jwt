import dotenv from "dotenv";
dotenv.config()
import express from "express";
const app = express()
const PORT = process.env.PORT;
import connect_db from "./config/connect_db.js";
import user_route from "./routes/user_route.js";


//connect with DATABASE
connect_db()

// JSON for postAPI
app.use(express.json())

// User Routing
app.use('/', user_route);

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})