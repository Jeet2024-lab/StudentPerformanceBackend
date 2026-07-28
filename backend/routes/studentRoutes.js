import express from "express"
import cors from "cors";
import {getStudentProfile} from '../controller/studentController.js'

const router=express.Router();
 router.get("/profile/:id",getStudentProfile);


 export default router;