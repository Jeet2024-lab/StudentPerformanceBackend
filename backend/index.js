import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import facultyRoutes from './routes/facultyRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();
const port=process.env.PORT || 3011;
const app=express();
app.use(cors());
app.use(express.json());
app.use("/",authRoutes);
app.use("/faculty",facultyRoutes);
app.use("/student",studentRoutes);
connectDB();
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})