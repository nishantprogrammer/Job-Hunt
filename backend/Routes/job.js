import express from 'express'
import { adminjob, getjobs, getJobsById, postjob } from '../Controllers/job.js'
import { isauthenticated } from '../Middlewares/Auth.js'
const router  = express.Router()
router.post("/register",isauthenticated,postjob)
router.get("/jobs",isauthenticated,getjobs)
router.get("/id/:id",isauthenticated,getJobsById)
router.get("/admin/jobs",isauthenticated,adminjob)
export default router

