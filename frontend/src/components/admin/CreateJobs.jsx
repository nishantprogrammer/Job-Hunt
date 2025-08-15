import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { JOB_ENDPOINT } from '../utils/Constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'



const CreateJobs = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const { companies } = useSelector(store => store.company)
  const [input, setinput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobtype: "",
    position: "",
    experiencelevel: "",
    CompanyName: "",


  })
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })

  }
  const selectChangeHandler = (value)=>{
    const SelectedCompany = companies.find((Company)=>Company.name.toLowerCase()== value.toLowerCase())
    setinput({...input,CompanyName:SelectedCompany.name})
  }
  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      setloading(true)

      const res = await axios.post(`${JOB_ENDPOINT}/register`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true



      })
      if (res.data.success) {

        toast.success(res.data.message)
        navigate("/admin/jobs")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)

    }
    finally {
      setloading(false)
    }

  }


  return (
    <div>
      <Navbar />

      <div className='max-w-xl mx-auto my-10'>
        <form onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8 '>

            <Button onClick={() => navigate("/admin/jobs")} variant="outline" className='flex items-center gap-2 text-gray-500 font-semibold'>
              <ArrowLeft />
              <span>back</span>
            </Button>
            <h1 className='font-bold text-xl'>Job Setup</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>

              <Label>Title</Label>
              <Input
                type='text'
                name='title'
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>

            <div>

              <Label>Description</Label>
              <Input
                type='text'
                name='description'
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>

              <Label>Requirements</Label>
              <Input
                type='text'
                name='requirements'
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>

            <div>

              <Label>Salary</Label>
              <Input
                type='number'
                name='salary'
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>

            <div>

              <Label>Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>

              <Label>Job Type</Label>
              <Input
                type='text'
                name='jobtype'
                value={input.jobtype}
                onChange={changeEventHandler}
              />
            </div>

            <div>

              <Label>Positions</Label>
              <Input
                type='number'
                name='position'
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>

            <div>

              <Label>Experience Level</Label>
              <Input
                type='number'
                name='experiencelevel'
                value={input.experiencelevel}
                onChange={changeEventHandler}
              />
            </div>

            {/* <div>

              <Label>Company Name</Label>
              <Input
                type='text'
                name='CompanyName'
                value={input.CompanyName}
                onChange={changeEventHandler}
              />
            </div> */}
          </div>
          {
            companies.length > 0 && (
              <Select onValueChange={selectChangeHandler} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      companies.map((company)=>
                      {
                        return(
                          <SelectItem value={company?.name}>{company.name}</SelectItem>

                        )
                      })
                    }
                    
                    
                  </SelectGroup>
                </SelectContent>
              </Select>

            )
          }

          {
            loading ? <Button className="w-full"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <div className='my-4'>
              <Button className="w-full" >Post Job</Button>
              {
                companies.length ==0 && <p className='text-xs text-red-600 font-bold text-center my-3' >*Please Register A Company Before Creating A JOb </p>
              }
            </div>
          }

        </form>

      </div>
    </div>
  )
}

export default CreateJobs