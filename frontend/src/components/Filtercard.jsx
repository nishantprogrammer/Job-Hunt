import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setsearchquery } from '@/redux/jobSlice'

const Filter = () => {
  const [selectedvalue,setselectedvalue] = useState("")
  const dispatch = useDispatch()
  const changeHandler=(value)=>
  {
    setselectedvalue(value)


  };
  useEffect(()=>
  {
    dispatch(setsearchquery(selectedvalue))
  },[selectedvalue])
  
  const filterdata = [
    {
      filtertype:"Location",
      array:["Mumbai","Delhi NCR","Pune","Banglore","Hyderabad"]
    },
    {
      filtertype:"Industry",
      array:["Frontend Devloper","Backend Devloper","Fullstack Devloper"]
    },
    {
      filtertype:"Salary",
      array:["10000","100000","50000"]
    },
  ]
  return (
    <div className='w-full rounded-medium p-3 bg-white'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'></hr>
      <RadioGroup value={selectedvalue} onValueChange={changeHandler} >
        {
          filterdata.map((element,index)=>(<div><h1 className='font-bold text-lg'>{element.filtertype}</h1>
          {
            element.array.map((element,idx)=>{
              const itemId = `r${index}-${idx}`
              return (
                <div className='flex items-center space-x-2 my-2'>
                  <RadioGroupItem value={element}  id={itemId} />
                  <label htmlFOr={itemId}>{element} </label>
                </div>
              )
            })
          }
          </div>))
         
          
        }

      </RadioGroup>
    </div>

  )
}

export default Filter