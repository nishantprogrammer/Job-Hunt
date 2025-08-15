import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { setsearchquery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const HeroSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [query,setquery]=useState("")
  const searchJobHandler = ()=>
  {
    dispatch(setsearchquery(query))
    navigate("/browse")
   
    

  }
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
            <span className=' mx-auto bg-gray-100 px-4 py-4 text-[#F83002] rounded-full font-medium '>No.1 Job Hunt Website</span>

        <h1 className='text-5xl font-bold'>Search,Apply<br/>Get Your<span className='text-[#6A38C2]'> Dream Job</span></h1>
        <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, voluptate? Optio vel eius harum?</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-4  items-center rounded-full mx-auto gap-4'>
            <input
            type="text"
            placeholder='Find Your Dream Jobs'
            className='outline-none border-none w-full'
            onChange={(e)=>setquery(e.target.value)}
            />
            <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6838C2]"><Search className='h-5 w-5'/></Button>
        </div>

        </div>
        
    </div>
  )
}

export default HeroSection