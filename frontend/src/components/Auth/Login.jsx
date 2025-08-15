import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'

import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { URL_ENDPOINT } from '../utils/Constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { Label } from '../ui/label'

const Login = () => {
    const [inputData, setinputData] = useState(
        {
            email:"",
            password:"",
            role:""
        }
    )
    const {loading,user} = useSelector(store=>store.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onchangeeventhandler = (e)=>
    {
        setinputData({...inputData,[e.target.name]:e.target.value})
    }
    const submithandler= async (e)=>
    {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
       const res = await axios.post(`${URL_ENDPOINT}/login`,inputData,{
        headers:{"Content-Type":'application/json'},
        withCredentials:true
       })
       if(res.data.success)
       {
        dispatch(setUser(res.data.user))
               navigate("/")
               toast.success(res.data.message)
       }
        



            
        } catch (error) {
            console.log(error)
            toast(error?.response?.data?.message)
            
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
        <Navbar/>
        <div className='flex items-center justify-center  max-w-7xl mx-auto'>
            
            <form onSubmit={submithandler} className=' w-1/2 border border-gray-200 rounded-md my-10 p-4 '>
                <h1 className='font-bold my-10'>Login</h1>
                
                <div className='my-2'>
                    <Label>Email:-</Label>
                    <Input type="email"placeholder="Enter Your Email" name="email" value={inputData.email} onChange={onchangeeventhandler}/>
                </div>
            
                <div className='my-2'>
                    <Label>Password:-</Label>
                    <Input type="password" placeholder="Enter Your Password"name="password"value={inputData.password} onChange={onchangeeventhandler} />
                </div>
                <div>
                    <RadioGroup className="flex items-baseline-last gap-4">
                            <div className="flex items-center gap-3">
                              <input 
                              type="radio"
                              name="role"
                              value="student"
                              checked={inputData.role=='student'}
                              onChange={onchangeeventhandler}
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
                              onChange={onchangeeventhandler}
                              className='cursor-pointer'
                              />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                            
                          
                        </RadioGroup>


                </div> 
                {
                    loading?<Button className="w-full"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button>:  <div className='my-4'>
                    <Button className="w-full" >Login</Button>
                </div>
                }
              
                <span className='flex justify-end text-sm'>Don't have An Account ?<Link className='text-blue-600' to="/signup">Signup</Link></span>


            </form>
        </div>
    </div>
  )
}

export default Login