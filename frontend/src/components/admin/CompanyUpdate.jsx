import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import axios from 'axios'
import { COMPANY_ENDPOINT } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setsingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'
import useGetCompanyById from '@/hooks/useGetCompanyById'


const CompanyUpdate = () => {
  
    const params = useParams()
    useGetCompanyById(params.CompanyId)
    const navigate = useNavigate()
    
    const {singleCompany} = useSelector(store=>store.company)
    const [input,Setinput]=useState(
        {
            name:"",
            description:"",
            website:"",
            location:"",
            file:null
        }
    )
    const [loading,setloading] = useState(false)
    const changeEventHandler = async(e)=>
    {
        Setinput({...input,[e.target.name]:e.target.value})
    }
    const changeFileHandler = async(e)=>
    {
        const file = e.target.files?.[0]
        Setinput({...input,file})
    }
    const submitHandler = async (e)=>
    {
        e.preventDefault();
         setloading(true)
        
        
        const formData = new FormData()
        formData.append("name",input.name)
        formData.append("description",input.description)
        formData.append("website",input.website)
        formData.append("location",input.location)
        if(input.file)
        {
            formData.append("file",input.file)
        }

        try {
            console.log(params.CompanyId)
            const res = await axios.put(`${COMPANY_ENDPOINT}/update/${params.CompanyId}`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            })
            if(res.data.success)
            {
               
                
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            
        }
        finally{
            setloading(false)
        }


    }
     useEffect(()=>
    {
        Setinput({
             name:singleCompany.name,
            description:singleCompany.description,
            website:singleCompany.website,
            location:singleCompany.location,
            file:singleCompany.file

        })
     },[singleCompany])
  return (
    <div>
        <Navbar/>
        
        <div className='max-w-xl mx-auto my-10'>
            <form onSubmit={submitHandler}>
                <div className='flex items-center gap-5 p-8 '>

                <Button onClick={()=>navigate("/admin/companies")} variant="outline" className='flex items-center gap-2 text-gray-500 font-semibold'>
                    <ArrowLeft/>
                    <span>back</span>
                </Button>
                <h1 className='font-bold text-xl'>Company Setup</h1>
                </div>
                <div className='grid grid-cols-2 gap-4'>

                <Label> Company Name</Label>
                <Input
                type='text'
                name='name'
                value={input.name}
                onChange={changeEventHandler}
                />
                </div>
                <div className='grid grid-cols-2 gap-4'>

                <Label>Description</Label>
                <Input
                type='text'
                name='description'
                value={input.description}
                onChange={changeEventHandler}
                />
                </div>
                <div className='grid grid-cols-2 gap-4'>

                <Label>Website</Label>
                <Input
                type='text'
                name='website'
                value={input.website}
                onChange={changeEventHandler}
                />
                </div>
                <div className='grid grid-cols-2 gap-4'>

                <Label>Location</Label>
                <Input
                type='text'
                name='location'
                value={input.location}
                onChange={changeEventHandler}
                />
                </div>
                <div className='grid grid-cols-2 gap-4'>

                <Label>Logo</Label>
                <Input
                type='file'
               accept='image/*'
               
                onChange={changeFileHandler}
                />
                </div>
                 {
                    loading?<Button className="w-full"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button>:  <div className='my-4'>
                    <Button className="w-full" >Update</Button>
                </div>
                }
                
            </form>

        </div>
    </div>
  )
}

export default CompanyUpdate