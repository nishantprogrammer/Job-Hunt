import React from 'react'
import Latestjobcards from './Latestjobcards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job)

  return (
    <div className='max-w-7xl mx-auto my-10 px-4'>
      <h1 className='text-2xl md:text-4xl font-bold text-center md:text-left mb-8'>
        <span className='text-[#683AC2]'>Latest & Top</span> Job Openings
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          allJobs.length <= 0 ? (
            <div className='col-span-full text-center py-12'>
              <p className='text-gray-500 text-lg mb-2'>No jobs available at the moment</p>
              <p className='text-sm text-gray-400'>Please check back later for new opportunities</p>
            </div>
          ) : (
            [...allJobs].reverse().slice(0,6).map((job) => (
              <Latestjobcards key={job._id} job={job} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default LatestJobs
