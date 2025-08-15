import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_ENDPOINT } from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { setsingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import { toast } from 'sonner'

const CreateCompany = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name,Setname]=useState("")
    const companyRegister = async ()=>
    {
        try {
        const res = await axios.post(`${COMPANY_ENDPOINT}/register`,{name},
            {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            }
        )
        if(res?.data?.success)
        {
            
            toast.success(res.data.message)
            
            const CompanyId = res?.data?.company?._id
            navigate(`/admin/companies/${CompanyId}`)
            dispatch(setsingleCompany(res.data.company))
        }

            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>

            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p  className='text-gray-500'>What Would You Like to Keep your Company name you Can Edit this Later</p>
            </div>
            <Label>Company name</Label>
            <Input className='my-2' type='text' placeholder='JobHunt,Microsoft etc. ' onChange={(e)=>Setname(e.target.value)}/>
            <div className='flex-items-center gap-2 my-10'>
                <Button variant = "outline" onClick={()=>{navigate("/admin/companies")}}>Cancel</Button>
                <Button onClick={companyRegister}>Continue</Button>
            </div>

        </div>
    </div>
  )
}

export default CreateCompany