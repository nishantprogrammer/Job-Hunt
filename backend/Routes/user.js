import express from 'express'
import { login, logout, register, updateprofile } from '../Controllers/user.js'
import { isauthenticated } from '../Middlewares/Auth.js'
import { singleUpload } from '../Middlewares/Multer.js'
const router = express.Router()
router.post("/register",singleUpload, register)
router.post("/login",login)
router.get("/logout",logout)

router.put("/profile/update",isauthenticated,singleUpload,updateprofile)
export default router