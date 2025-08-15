import { Company } from '../Models/Company.js'
import cloudinary from '../utils/cloudinary.js'
import getdatauri from '../utils/datauri.js'
export const registerCompany = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({ message: "Company Name Is Required", success: false })
        }
        const userId = req.user
        let company = await Company.findOne({ name })
        if (!company) {
            company = await Company.create(
                {
                    name,
                    userId
                    

                }
            )

            return res.status(200).json({ message: "Company Created Successfully", company ,success: true })


        }
        return res.status(400).json({ message: "Company Already Registered With This  Same Name", success: false })

    } catch (error) {
        console.log(error)
        

    }
}
export const getCompany = async (req, res) => {
    try {

        const userId = req.user
        let company = await Company.find({ userId })
        if (company) {
            return res.status(200).json({ message: "The Company Use Searched For is ", company, success: true })
        }
        return res.status(400).json({ message: "No Company FOund With This Name" })
    } catch (error) {
        console.log(error)

    }
}
export const getCompanybyid = async (req, res) => {
    try {
        const id = req.params.id
        let company = await Company.findById(id)
        if (!company) {
            return res.status(404).json({ message: "No Company Found With This Id", success: false })
        }
        return res.status(200).json({ message: "The Company You Searched For Is ", company, success: true })

    } catch (error) {
        console.log(error)

    }
}
export const updateCompany = async (req, res) => {  
    try {
        const { name, description, website, location } = req.body
        const file=req.file
        console.log(file)
        const fileuri = getdatauri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileuri.content)
        const userId = req.user
        const Id = req.params.id
        
        let company = await Company.findByIdAndUpdate(Id, { name, description, website, location,logo:cloudResponse.secure_url }, { new: true })
        await company.save();
        if (!company) {
            return res.status(404).json({ message: "No Company Found With This name" })
        }
        return res.status(200).json({ message: "Company Updated Successfully", company, success: true })

    } catch (error) {
        console.log(error)

    }
}