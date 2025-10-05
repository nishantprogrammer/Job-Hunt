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
                console.log("usegetAllJobs - Fetching jobs with keyword:", searchquery)
                console.log("usegetAllJobs - JOB_ENDPOINT:", JOB_ENDPOINT)
                console.log("usegetAllJobs - User:", user)

                const res = await axios.get(`${JOB_ENDPOINT}/jobs?keyword=${searchquery}`,{withCredentials:true})
                console.log("usegetAllJobs - API Response:", res.data)

                if(res.data.success)
                {
                    console.log("usegetAllJobs - Dispatching jobs:", res.data.jobs)
                    dispatch(setAllJobs(res.data.jobs))
                } else {
                    console.log("usegetAllJobs - API success false:", res.data.message)
                }

            } catch (error) {
                console.log("usegetAllJobs - Error:", error)
                console.log("usegetAllJobs - Error response:", error.response?.data)
            }
        }

        const fetchSavedJobs = async()=>
        {
            if(!user) {
                console.log("usegetAllJobs - No user, skipping saved jobs fetch")
                return
            }
            try {
                console.log("usegetAllJobs - Fetching saved jobs for user:", user)
                const res = await axios.get(`${SAVED_JOB_ENDPOINT}/saved`,{withCredentials:true})
                console.log("usegetAllJobs - Saved jobs response:", res.data)

                if(res.data.success)
                {
                    dispatch(setSavedJobs(res.data.jobs))
                    dispatch(setSavedJobIds(res.data.jobs.map(job => job._id)))
                }

            } catch (error) {
                console.log("usegetAllJobs - Saved jobs error:", error)

            }
        }

        console.log("usegetAllJobs - Effect triggered, calling fetchAllJobs and fetchSavedJobs")
        fetchAllJobs()
        fetchSavedJobs()


    },[dispatch, user, searchquery])

}

export default usegetAllJobs
