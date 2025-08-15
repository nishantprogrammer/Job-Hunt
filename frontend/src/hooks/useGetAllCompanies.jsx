import { COMPANY_ENDPOINT } from '@/components/utils/Constant'
import { setcompanies } from '@/redux/companySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
 useEffect(()=>
{
    const fetchAllcompanies = async ()=>
    {
        try {
           

            const res = await axios.get(`${COMPANY_ENDPOINT}/show`,{withCredentials:true})
        if(res.data.success)
        {
            dispatch(setcompanies(res.data.company))
        }
            
        } catch (error) {
            console.log(error)
            
        }
    }
    fetchAllcompanies()
},[])
}

export default useGetAllCompanies