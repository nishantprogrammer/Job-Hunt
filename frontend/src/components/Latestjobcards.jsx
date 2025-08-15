
import React from 'react'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Latestjobcards = ({job}) => {
  const navigate = useNavigate()
  console.log(job.title)
  
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md bg-white border border-gray-200 cursor-pointer'>
        <div>
        <h1 className='font-medium tex-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
    </div>
    <div>
        <h1 className='font-bold text-lgmy-2'>{job.title}</h1>
        <p className='text-sm text-gray-600'>{job.description}</p>


    </div>
    <div className='flex items-center p-2 mt-4'>
       <Badge className={'text-blue-700 font-bold'} variant="ghost">{job.position} Position</Badge>
       <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job.jobtype}</Badge>
       <Badge className={'text-[#7209B7] font-bold'} variant="ghost">{job.salary}</Badge>

    </div>

        </div>
  )
}

export default Latestjobcards