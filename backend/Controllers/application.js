import { application } from "express";
import { Application } from "../Models/Application.js";
import { Job } from "../Models/Job.js";
export const applyjobs = async(req,res)=>
{
    try {
        const Id = req.user
        const jobid = req.params.id
        let job = await Application.findOne({job:jobid,userId:Id})
        if(job)
        {
            return res.status(200).json({message:"Already Applied For this job",success:false})
        }
        let jobdetail = await Job.findById(jobid)
        if(!jobdetail)
        {
            return res.status(404).json({message:"No job Found With This Id"})
        }
        const newapplication = await Application.create(
            {
                job:jobdetail._id,
                userId:Id
            }
        )
        jobdetail.applications.push(newapplication)
        await jobdetail.save()
        return res.status(200).json({message:"applied Successfully",success:true})
           
     
        
    } catch (error) {
        console.log(error)
        
    }



}

export const getAppliedJobs = async(req,res)=>
{
    try {
        const Id = req.user
        const alljob = await Application.find({userId:Id}).sort({createdAt:-1}).populate(
            {
                path:"job",
                options:{sort:{createdAt:-1}},
                populate:{

                path:"company",
                options:{sort:{createdAt:-1}}
                }
            }

        )
        if(! alljob)
        {
            res.status(404).json({message:"no jobs found",success:true})
        }
        return res.status(200).json({message:"The Jobs You Applied For is ",alljob,success:true})
       
        
    } catch (error) {
        console.log(error)
        
    }
}

export const getApplicant = async(req,res)=>
{
   try {
    const Id = req.user
    const jobid = req.params.id
    let job = await Job.findById(jobid).populate(
        {
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
            path:"userId",
            options:{sort:{createdAt:-1}}
            }


        }
    )
    if(!job)
    {
        return res.status(404).json({message:"No Job Found With this id",success:false})

    }
    if(job.applications.length==0)
    {
        return res.status(404).json({message:"no Applicant are available for this job"})
    }
    
    return res.status(200).json({message:"The applicants are",job,success:true})

     
    
   } catch (error) {
    console.log(error)
    
   }
}
export const updatestatus = async(req,res)=>
{
    try {   
        const {status}=req.body
        const applicationid = req.params.id
        if(! status)
        {
            return res.status(404).json({message:"No Staus Found ",success:false})
        }
        let applicant = await Application.findByIdAndUpdate(applicationid,{status})
        if(! applicant)
        {
            return res.status(404).json({message:"No Applicant Found with this id"})
        }
        return res.status(200).json({message:"Application Updated Successfully",applicant,success:true})


        


    } catch (error) {
        console.log(error)
        
    }

}