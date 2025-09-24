import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import NotesRoutes from "./Routes/NotesRoutes.js";
import {connectDB} from "./Config/Db.js";
import RateLimiter from "./Middleware/RateLimiter.js";

dotenv.config();

const app=express()
const PORT=process.env.PORT || 5001

app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json())
app.use(RateLimiter);
app.use("/api/notes", NotesRoutes);

connectDB().then(()=>{
    app.listen(PORT,() => {
    console.log("Server started on PORT:",PORT)
   });
}).catch(err => console.error("DB connection failed:", err));