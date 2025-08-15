import { JOB_ENDPOINT } from '@/components/utils/Constant'
import { setalladminJobs, setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react';


import React from 'react'
import { useDispatch } from 'react-redux'

const usegetAllAdminJobs = () => {
    const dispatch = useDispatch()
     useEffect(()=>
    {
        const fetchAllJobs = async()=>
        { try {
            const res = await axios.get(`${JOB_ENDPOINT}/admin/jobs`,{withCredentials:true})
             console.log("Fetched Admin Jobs: ", res.data.job)

            if(res.data.success)
            {
                dispatch(setalladminJobs(res.data.job))
                console.log(setalladminJobs)
            }
            
        } catch (error) {
            console.log(error)
            
        }

        }
        fetchAllJobs()
    },[])
 
}

export default usegetAllAdminJobs