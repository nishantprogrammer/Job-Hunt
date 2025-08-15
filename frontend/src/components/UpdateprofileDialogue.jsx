import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

import { Label } from './ui/label'
import { Input } from './ui/input'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from './ui/button'
import { URL_ENDPOINT } from './utils/Constant'
import { useNavigate } from 'react-router-dom'

import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'

import { Loader2 } from 'lucide-react'


const UpdateprofileDialogue = ({open,setopen}) => {
    const navigate = useNavigate()
const dispatch = useDispatch()

    const{user}=useSelector(store=>store.auth)
    const [loading, setloading] = useState(false)
    const [input, setinput] = useState(
        {
            name:user?.name || "",
            email:user?.email || "" ,
            phoneNumber:user?.phoneNumber || "",
            bio:user?.profile?.bio || "",
            skills:user?.profile?.skills?.map(skill=>skill) || "" ,
            file:user?.profile?.resume||""


        }
       

    )
     const onchangeHandler =async (e)=>
        {
            setinput({...input,[e.target.name]:e.target.value})
        }
    const filechangehandler =async (e)=>
    {
       const file = e.target.files?.[0]
       setinput({...input,file})
    }
    const submitHandler = async (e)=>
    {
        e.preventDefault();
        setloading(true)
       const formData = new FormData()
       formData.append("name",input.name)
       formData.append("email",input.email)
       formData.append("phoneNumber",input.phoneNumber)
       formData.append("bio",input.bio)
       formData.append("skills",input.skills)
       if(input.file)
       {
        formData.append("file",input.file)
       }
       try {
        const res = await axios.put(`${URL_ENDPOINT}/profile/update`,formData,{
            headers:
            {
                'Content-Type':"multipart/form-data",
           
            },
            withCredentials:true
        });
        if(res.data.success)
        {
            dispatch(setUser(res.data.user))

            navigate("/profile")
            toast.success(res.data.message)
        }
        
       } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        
       }
       finally
       {
        setloading(false)

        setopen(false)
       }

    }
  return (
    <div>
        <Dialog open={open}  >
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=> setopen(false)}>
                <DialogHeader>
                    <DialogTitle> Update Profile</DialogTitle>

                </DialogHeader>
                <form onSubmit={submitHandler} >
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4' >


                        <Label htmlFor="name" className={'text-right'}>Name</Label>
                        <Input id = "name"
                        name="name"
                        value={input.name}
                        onChange={onchangeHandler}
                        className={'col-span-3'}

                         /> 
                        
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >


                        <Label htmlFor="email" className={'text-right'}>Email</Label>
                        <Input id = "email"
                        name="email"
                        value={input.email}
                        onChange={onchangeHandler}
                        className={'col-span-3'}

                         /> 
                        
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >


                        <Label htmlFor="phoneNumber" className={'text-right'}>Number</Label>
                        <Input id = "phoneNumber"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={onchangeHandler}
                        className={'col-span-3'}

                         /> 
                        
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >


                        <Label htmlFor="bio" className={'text-right'}>Bio</Label>
                        <Input id = "bio"
                        name="bio"
                        value={input.bio}
                        onChange={onchangeHandler}
                        className={'col-span-3'}

                         /> 
                        
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >


                        <Label htmlFor="skills" className={'text-right'}>Skills</Label>
                        <Input id = "skills"
                        name="skills"
                        value={input.skills}
                        onChange={onchangeHandler}
                        className={'col-span-3'}

                         /> 
                        
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4' >


                        <Label htmlFor="resume" className={'text-right'}>Resume</Label>
                        <Input id = "resume"
                        type="file"
                        accept="application/pdf"
                        name="file"
                        onChange={filechangehandler}
                        className={'col-span-3'}

                         /> 
                        
                        </div>
                
                        

                    </div>
                    {
                         loading?<Button className="w-full"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button>:  <div className='my-4'>
                    <Button className="w-full" >Update</Button>
                </div>
                    } 
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateprofileDialogue