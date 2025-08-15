import express from 'express'
import { applyjobs, getApplicant, getAppliedJobs, updatestatus } from '../Controllers/application.js';
import { isauthenticated } from '../Middlewares/Auth.js';
const router = express.Router();
router.get("/register/:id",isauthenticated,applyjobs)
router.get("/get/appliedjobs",isauthenticated,getAppliedJobs)
router.get("/admin/get/:id",isauthenticated,getApplicant)
router.put("/status/:id",isauthenticated,updatestatus)
export default router