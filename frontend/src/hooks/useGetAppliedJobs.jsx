import { APPLICATION_ENDPOINT } from '@/components/utils/Constant'
import { setappliedJobs } from '@/redux/applicantSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch()
 useEffect (()=>
{
    const fetchAppliedJobs = async()=>
    {
        try {
            const res = await axios.get(`${APPLICATION_ENDPOINT}/get/appliedjobs`,{withCredentials:true})
            
            if(res.data.success)
            {
                
                dispatch(setappliedJobs(res.data.alljob))

            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
    fetchAppliedJobs()

},[dispatch])
}

export default useGetAppliedJobs