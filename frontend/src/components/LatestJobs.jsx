import React, { useEffect } from 'react'
import Latestjobcards from './Latestjobcards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LatestJobs = () => {
  const navigate = useNavigate()
  const {allJobs} = useSelector(store=>store.job)

  console.log("LatestJobs - allJobs:", allJobs)
  console.log("LatestJobs - allJobs length:", allJobs.length)

  return (
    <div className='max-w-7xl items-center mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#683AC2]'>Latest & Top</span> Job Opening</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
      {
        allJobs.length <= 0 ? (
          <div className='col-span-3 text-center py-8'>
            <p className='text-gray-500 text-lg'>No jobs available at the moment</p>
            <p className='text-sm text-gray-400 mt-2'>Please check back later for new opportunities</p>
          </div>
        ) : (
          [...allJobs].reverse().slice(0,6).map((job) => {
            console.log("Rendering job:", job)
            return <Latestjobcards key={job._id} job={job} />
          })
        )
      }
      </div>

    </div>
  )
}

export default LatestJobs
