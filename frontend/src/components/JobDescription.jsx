import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_ENDPOINT, JOB_ENDPOINT } from './utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { setsingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'


const JobDescription = () => {
    const {singleJob} = useSelector(store=>store.job)
    const {user}= useSelector(store=>store.auth)


    const isInitiallyApplied = singleJob?.applications?.some(applications=>applications.userId == user?._id) || false
    const [isApplied,setApplied]= useState(isInitiallyApplied)
    const params = useParams()
    const jobid = params.id
    const dispatch = useDispatch()
    const applyjobHandler =async ()=>
    {
       try {
         const res  = await axios.get(`${APPLICATION_ENDPOINT}/register/${jobid}`,{withCredentials:true})
        if(res.data.success)
        {
            setApplied(true)
            const updatedSinglejob = {...singleJob,applications:[...singleJob.applications,{userId:user?._id}]}
            dispatch(setsingleJob(updatedSinglejob))
            
            toast.success(res.data.message)
            
        }
        
       } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        
       }

    }
    console.log(jobid)
   useEffect(()=>
{
    const fetchsinglejob = async()=>
    {
        try {
            const res = await axios.get(`${JOB_ENDPOINT}/id/${jobid}`,{withCredentials:true})
            console.log(res)
        if(res.data.success)
        {
            dispatch(setsingleJob(res.data.jobs))
            setApplied(res.data.jobs.applications.some(applications=>applications.userId==user?._id))
        }
        console.log(setsingleJob)
        
            
        } catch (error) {
            console.log(error)
            
        }
    }
    fetchsinglejob()
},[jobid,dispatch,user?._id])

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className='flex justify-between items-center'>
                <div>

                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center p-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Position</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobtype}</Badge>
                        <Badge className={'text-[#7209B7] font-bold'} variant="ghost">{singleJob?.salary}</Badge>

                    </div>
                </div>



                <Button onClick={isApplied?null:applyjobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{isApplied ? 'Already Applied' : 'Apply now'}</Button>

            </div>
            <h1 className='border-b-2 border-b-gray-200 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'> Role <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'> Location <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'> Description <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'> Experience <span className='pl-4 font-normal text-gray-800'>{singleJob?.experiencelevel??"NA"} Years</span></h1>
                <h1 className='font-bold my-1'> Salary <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'> Total Applicants <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length??0}</span></h1>
                <h1 className='font-bold my-1'> Posted Date <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>

        </div>
    )
}

export default JobDescription