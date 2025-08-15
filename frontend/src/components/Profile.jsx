import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import {  Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

import Appliedjobstable from './Appliedjobstable'

import { Label } from './ui/label'
import UpdateprofileDialogue from './UpdateprofileDialogue'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
// import store from '@/redux/store'
// const skills = ["Html", "JavaScript", "CSS", "Reactjs","Nodejs"]
const isResume = true

const Profile = () => {
  useGetAppliedJobs()

  const [open, setopen] = useState(false)
  const {user} = useSelector(store=>store.auth)
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl  mx-auto  bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between items-center'>

        <div className='flex items-center gap-4'>

        <Avatar className='h-24 w-24'>
          <AvatarImage src={user.profilephoto}/>
        </Avatar>
        <div>

        <h1 className='font-medium text-xl' >{user.name}</h1>
        <p>{user?.profile.bio}</p>
        </div>
        </div>
        
        <Button onClick ={()=>setopen(true)} variant ='outline'><Pen/></Button>
        </div>
        <div className='my-5'>
          <div className='flex gap-3 my-2'>

          <Mail/>
          <span>{user.email}</span>
          </div>
          <div className='flex gap-3 my-2'>

          <Contact/>
          <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>

          {
            user.profile.skills.length !=0? user?.profile.skills.map((element,index)=>(<Badge key={index}>{element}</Badge>)):<span>NA</span>
          }
          </div>
        </div>
        <div className='grid max-w-sm w-full gap items-center gap-1.5'>
          <Label className='text-medium font-bold'>Resume</Label>
          {
            isResume ? <a target='main' href={user.profile.resume} className='text-blue-600 w-full hover:underline cursor-pointer'>{user.profile.resumeOriginalName}</a> : <span>NA</span>
          }

        </div>



        <div className='rounded-2xl  max-w-4xl mx-auto  bg-white'>
          <h1>Applied jobs</h1>
          <Appliedjobstable/>
        </div>


      </div>
      <UpdateprofileDialogue open={open} setopen={setopen}  />
    </div>
  )
}

export default Profile