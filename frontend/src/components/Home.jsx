import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import Categorycorousel from './Categorycorousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import usegetAllJobs from '@/hooks/usegetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import usegetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const Home = () => {
  usegetAllJobs()
  const navigate = useNavigate()
  const {user}=useSelector(store=>store.auth)
  useEffect(()=>{
    if(user?.role=='recruiter')
    {
      
      navigate("/admin/companies")

      
    }


      

  },[])
  return (
    <div>
      <Navbar/>
      <HeroSection/>
       <Categorycorousel/>
       <LatestJobs/> 
       <Footer/> 
      </div>
  )
}

export default Home