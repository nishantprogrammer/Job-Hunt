import { JOB_ENDPOINT, SAVED_JOB_ENDPOINT } from '@/components/utils/Constant'
import { setAllJobs, setSavedJobs, setSavedJobIds } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react';


import React from 'react'
import { useDispatch, useSelector } from 'react-redux'



const usegetAllJobs = () => {
    const {searchquery} = useSelector(store=>store.job)
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()

    useEffect(()=>
    {
        const fetchAllJobs = async()=>
        {
            try {
                const res = await axios.get(`${JOB_ENDPOINT}/jobs?keyword=${searchquery}`,{withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                // Silent error handling for production
                console.error("Failed to fetch jobs")
            }
        }

        const fetchSavedJobs = async()=>
        {
            if(!user) return
            try {
                const res = await axios.get(`${SAVED_JOB_ENDPOINT}/saved`,{withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setSavedJobs(res.data.jobs))
                    dispatch(setSavedJobIds(res.data.jobs.map(job => job._id)))
                }
            } catch (error) {
                // Silent error handling for production
                console.error("Failed to fetch saved jobs")
            }
        }

        fetchAllJobs()
        fetchSavedJobs()

    },[dispatch, user, searchquery])
}

export default usegetAllJobs
