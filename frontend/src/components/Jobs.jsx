import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Filter from './Filtercard'
import Job from './Job'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const Jobs = () => {
  const { allJobs, searchquery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)
  useEffect(() => {
    if (searchquery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchquery.toLowerCase())||
        job.description.toLowerCase().includes(searchquery.toLowerCase())||
        job.location.toLowerCase().includes(searchquery.toLowerCase())||
        job.salary.toString().includes(searchquery.toLowerCase())
      })
      setFilterJobs(filteredJobs)

    }
    else {
      setFilterJobs(allJobs)

    }
  }, [allJobs, searchquery])
  return (
    <div className=''><Navbar />
      <div className='flex gap-5 mt-5  max-w-7xl r mx-auto'>
        <div className='w-[20%]'>
          <Filter />

        </div>
        {
          filterJobs.length <= 0 ? <span>No Jobs Found</span> : (
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>

              <div className='grid grid-cols-3 gap-4 '>
                {
                  filterJobs.map((job) => (

                    <motion.div
                    initial={{opacity:0,x:100}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0,x:100}}
                    transition={{duration:0.3}}
                     key="job._id">

                      <Job job={job} />
                    </motion.div>
                  ))
                }
              </div>
            </div>
          )
        }

      </div>



    </div>
  )
}

export default Jobs