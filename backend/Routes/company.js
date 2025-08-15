import express from 'express'
import { getCompany, getCompanybyid, registerCompany, updateCompany } from '../Controllers/company.js';
import { isauthenticated } from '../Middlewares/Auth.js';
import { singleUpload } from '../Middlewares/Multer.js';

const router = express.Router();
router.post('/register',isauthenticated,registerCompany)
router.get("/show",isauthenticated,getCompany)
router.get("/show/:id",isauthenticated,getCompanybyid)
router.put("/update/:id",isauthenticated,singleUpload,updateCompany)
export default router