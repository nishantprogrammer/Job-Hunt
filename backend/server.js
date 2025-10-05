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
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173', // Always allow local dev
  process.env.PRODUCTION_FRONTEND_URL, // Vercel deployment URL
  'https://job-hunt-1-i6cm.onrender.com' // Additional production frontend
];

const corsOption = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in our allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Production-ready: Only allow specified origins
    
    // Block the request if the origin is not allowed
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

app.use(cors(corsOption));


const port = process.env.PORT || 8000
app.use("/api/v1/user",userRouter)
app.use("/api/v1/company",companyrouter)
app.use("/api/v1/job",jobrouter)
app.use("/api/v1/applications",applicationrouter)
app.use("/api/v1/savedjobs",savedJobRouter)
app.listen (port,()=>{dbconnect();console.log(`Server is Running on port ${port}`)});
