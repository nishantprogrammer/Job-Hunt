import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import dbconnect from './utils/db.js'
import userRouter from './Routes/user.js'
import companyrouter from './Routes/company.js'
import jobrouter from './Routes/job.js'
import applicationrouter from './Routes/application.js'
import savedJobRouter from './Routes/savedJob.js'
dotenv.config({});
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption));

const port = process.env.PORT || 8000
app.use("/api/v1/user",userRouter)
app.use("/api/v1/company",companyrouter)
app.use("/api/v1/job",jobrouter)
app.use("/api/v1/applications",applicationrouter)
app.use("/api/v1/savedjobs",savedJobRouter)
app.listen (port,()=>{dbconnect();console.log(`Server is Running on port ${port}`)});