import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'

import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import axios from 'axios'
import { URL_ENDPOINT } from '../utils/Constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { Label } from '../ui/label'

const Signup = () => {
    const [inputData, setinputData] = useState(
        {
            name:"",
            email:"",
            phoneNumber:"",
            password:"",
            role:"",
            file:""
        }
    )
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading,user} = useSelector(store=>store.auth)
    const changeeventhandler =(e)=>
    {
        setinputData({...inputData,[e.target.name]:e.target.value})
    }
    const changefilehandler = (e)=>
    {
        setinputData({...inputData,file:e.target.files?.[0]})
    }
    const submithandler = async (e)=>
    {
        e.preventDefault()
       
            const formData = new FormData()
            formData.append("name",inputData.name)
            formData.append("email",inputData.email)
            formData.append("phoneNumber",inputData.phoneNumber)
            formData.append("password",inputData.password)
            formData.append("role",inputData.role)
            if(inputData.file)
            {
                formData.append("file",inputData.file)
            }
             try {
               dispatch(setLoading(true))
                const res = await axios.post(`${URL_ENDPOINT}/register`,formData,{
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials:true
                });
                if(res.data.success)
                {
                    navigate("/login");
                    toast.success(res.data.message);
                }


            
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            
        }
        finally
        {
           dispatch(setLoading(false))
        }
    }
     useEffect(()=>{
            if(user)
            {
                navigate("/")
            }
        },[])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto   '>
                <form onSubmit={submithandler}  className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold mb-5 text-xl'>SignUp</h1>
                    <div className='my-2'>
                        <Label>Name:-</Label>
                        <Input type="text" placeholder="Enter Your Name" 
                        name="name"
                        value={inputData.name}
                        onChange={changeeventhandler}
                        />

                    </div>
                    <div className='my-2'>
                        <Label>Email:-</Label>
                        <Input type="email" placeholder="Enter Your Email"
                          name="email"
                        value={inputData.email}
                        onChange={changeeventhandler}
                        />

                    </div>
                    <div className='my-2'>
                        <Label>Phonenumber:-</Label>
                        <Input type="Number" placeholder="Enter Your Phone Number" 
                          name="phoneNumber"
                        value={inputData.phoneNumber}
                        onChange={changeeventhandler}
                        
                        />

                    </div>
                    <div className='my-2'>
                        <Label>Password:-</Label>
                        <Input type="password" placeholder="Enter Your Password" 
                          name="password"
                        value={inputData.password}
                        onChange={changeeventhandler}
                        
                        />

                    </div>
                    <div className='flex items-center justify-between' >
                        <RadioGroup className="flex items-baseline-last gap-4">
                            <div className="flex items-center gap-3">
                              <input 
                              type="radio"
                              name="role"
                              value="student"
                              checked={inputData.role=='student'}
                              onChange={changeeventhandler}
                              className='cursor-pointer'
                              />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                 <input 
                              type="radio"
                              name="role"
                              value="recruiter"
                              checked={inputData.role=='recruiter'}
                              onChange={changeeventhandler}
                              className='cursor-pointer'
                              />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                            
                          
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input accept="image/*"
                            type="file"
                            onChange={changefilehandler}
                            className="cursor-pointer"
                             />

                        </div>


                    </div>
                    {
                        loading?<Button className="w-full"><Loader2 className='mr-4 h-4 w-4 animate-spin'/>Please wait</Button>:<Button type="submit" className="flex items-center mx-auto my-4 w-full">SignUp</Button>
                    }
                    
                    <span className='flex item-center justify-end text-sm' >Already Have An Account ?<Link to ="/login" className='text-blue-600'>Login</Link></span>



                </form>
            </div>
        </div>
    )
}

export default Signup