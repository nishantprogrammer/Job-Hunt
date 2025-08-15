import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setsearchCompany } from '@/redux/companySlice'
import { useDispatch } from 'react-redux'



const Companies = () => {
  useGetAllCompanies()
  const dispatch = useDispatch()
const navigate = useNavigate()
const[input,Setinput]=useState("")
useEffect(()=>{
  
    dispatch(setsearchCompany(input))


  
  

},[input])

    
  return (
    <div><Navbar/>
    <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>

        <Input className="w-fit" placeholder="Filter by Name" onChange={(e)=>Setinput(e.target.value)}/>
        <Button onClick ={()=> navigate("/admin/companies/create")}> New Company</Button>
        </div>
        <CompaniesTable/>
    </div>
    </div>

  )
}

export default Companies