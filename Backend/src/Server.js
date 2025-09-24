import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "path";
import NotesRoutes from "./Routes/NotesRoutes.js";
import {connectDB} from "./Config/Db.js";
import RateLimiter from "./Middleware/RateLimiter.js";

dotenv.config();

const app=express()
const PORT=process.env.PORT || 5001
const __dirname=path.resolve();
if (process.env.NODE_ENV!=="production") {
  app.use(cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json())
app.use(RateLimiter);
app.use("/api/notes", NotesRoutes);

if(process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname, "../Frontend/my-app/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/my-app","dist","index.html"));
  });
}

connectDB().then(()=>{
    app.listen(PORT,() => {
    console.log("Server started on PORT:",PORT)
   });
}).catch(err => console.error("DB connection failed:", err));