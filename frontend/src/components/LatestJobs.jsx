import React from 'react'
import Latestjobcards from './Latestjobcards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LatestJobs = () => {
  // const jobcards = [1,2,3,4,5,6,7,8]
  const navigate = useNavigate()
  const {allJobs} = useSelector(store=>store.job)
  return (
    <div className='max-w-7xl items-center mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#683AC2]'>Latest & Top</span> Job Opening</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
      {
        allJobs.length<=0?<span>Job Not Available</span>:[...allJobs].reverse().slice(0,6).map((job)=><Latestjobcards  key={job._id} job={job} />)
      }
      </div>

    </div>
  )
}

export default LatestJobs