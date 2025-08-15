import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import getdatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role } = req.body
        const file = req.file
        const fileuri = getdatauri(file)
        console.log(file)
        const cloudResponse =await  cloudinary.uploader.upload(fileuri.content)
        console.log(name, email, password, phoneNumber, role)
        if (!name || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: "No Field Should Be Empty", success: false })
        }
        console.log(email)
        const user = await User.findOne({ email })
        console.log(user)
        if (user) {
            return res.status(400).json({ message: "User Already Exists With this Email" })
        }
        const hashpassword = await bcrypt.hash(password, 10)
        await User.create(
            {
                name,
                email,
                password: hashpassword,
                phoneNumber,
                role,

                profilephoto: cloudResponse.secure_url


            }
        )
        res.status(201).json({ message: "User Registered Successfully", success: true })

    } catch (error) {
        console.log(error)

    }

}
//login
export const login = async (req, res) => {

    try {
        const { email, password, role } = req.body

        if (!email || !password || !role) {
            return res.status(400).json({ message: "No Field Should Be Empty" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "No Such Email Exists please Sign Up" })
        }
        const compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            return res.status(400).json({ message: "Invalid password", success: false })
        }
        else if (role != user.role) {
            return res.status(400).json({ message: "No User Found With This ROle", success: false })
        }
        const token = await JWT.sign({ tokendata: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({ message: `Welcome Back ${user.name}`, user, success: true, token })

    } catch (error) {
        console.log(error)


    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "LoggedOut successfully", success: true })

    } catch (error) {
        console.log(error)

    }

}
export const updateprofile = async (req, res) => {
    try {
        const { name, email, phoneNumber, bio, skills } = req.body
        const file = req.file
        console.log(name,email,phoneNumber,file,bio,skills)

        const fileuri = getdatauri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileuri.content, {
            resource_type: "auto"
        })
 
        //file setup
        let skillsArray;

        if (skills) {
            skillsArray = skills.split(",")

        }



        const userid = req.user
        let user = await User.findById(userid)

        if (!user) {
            return (

                res.status(404).json({ message: "No User Found With This Id" })
            )
        }
        let Email = await User.findOne({ email })
        if (Email && Email._id.toString() !== userid) {
            return res.status(401).json({ message: "User Already Exists" })
        }
        let Phonenumber = await User.findOne({ phoneNumber })
        if (Phonenumber && Phonenumber._id.toString() !== userid) {
            return res.status(401).json({ message: "User Already Exists" })
        }

        if (name) user.name = name
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }

        await user.save()
        return res.status(200).json({ message: "Updated Successfully", success: true, user })



    } catch (error) {
        console.log(error)

    }
}
