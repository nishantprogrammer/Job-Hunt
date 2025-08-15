import { COMPANY_ENDPOINT } from '@/components/utils/Constant'
import { setsingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const useGetCompanyById = (CompanyId) => {
        const dispatch = useDispatch()

    
    
 useEffect(()=>
{
    const fetchJobById =async ()=>
    {
        try {
            const res = await axios.get(`${COMPANY_ENDPOINT}/show/${CompanyId}`,{withCredentials:true})
            if(res.data.success)
            {
                dispatch(setsingleCompany(res.data.company))

            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
    fetchJobById()
},[CompanyId,dispatch])
}

export default useGetCompanyById