import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_ENDPOINT } from '../utils/Constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setapplicants } from '@/redux/applicantSlice';
import axios from 'axios';

const Applicants = () => {
    const params = useParams()
                const dispatch = useDispatch()
                const {applicants} = useSelector(store=>store.applicant) 
    
    useEffect(()=>{
        const fetchAllApplicants = async()=>
            {
                
            try {
            console.log(params.id)

            const res = await axios.get(`${APPLICATION_ENDPOINT}/admin/get/${params.id}`,{withCredentials:true})
           

                
                dispatch(setapplicants(res.data.job))
            
            
            
                
            } catch (error) {
                console.log(error)
                dispatch(setapplicants([]))

                
            }
        }
       

            fetchAllApplicants()
        
    },[params.id]);
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length || 0}</h1>
            <ApplicantsTable/>

        </div>
    </div>
  )
}

export default Applicants