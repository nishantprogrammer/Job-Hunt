import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Jobs from './Jobs'
import Job from './Job'
import usegetAllJobs from '@/hooks/usegetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setsearchquery } from '@/redux/jobSlice'

const Browse = () => {
  const dispatch = useDispatch()
  usegetAllJobs()
  const {allJobs} = useSelector(store=>store.job)
   useEffect(()=>
    {
      dispatch(setsearchquery(""))
    })
  return (
    <div className=''><Navbar/>
    <div className=' max-w-7xl mx-auto '>
        <h1 className='font-bold text-xl my-10'>Search Results({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
        {
          
            
          allJobs.map((job)=>{
            return(
              <div className=''>

                <Job job={job}/>
              </div>
            )
          })
          
        }
        </div>
        </div>
        </div>
  )
}

export default Browse