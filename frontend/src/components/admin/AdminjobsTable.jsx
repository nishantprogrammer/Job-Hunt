import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AdminjobsTable = () => {
    const navigate = useNavigate()
    const {alladminJobs,searchJobs} = useSelector(store=>store.job)
    const [filterName,setfilterName]=useState(alladminJobs)
    useEffect(()=>
    {
        console.log(alladminJobs)
        const filterdName = alladminJobs.length >=0 && alladminJobs.filter((Job)=>{
            if(!searchJobs)
            {
                return true
            }
            return Job?.title?.toLowerCase().includes(searchJobs.toLowerCase()) || Job?.CompanyName?.toLowerCase().includes(searchJobs.toLowerCase())
        })
        setfilterName(filterdName)
       
    },[alladminJobs,searchJobs])
    
    return (
        <div>
            <Table>
                <TableCaption>
                    A List Of Your Recent Posted Jobs
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterName.length <= 0 ? <span> No Jobs Available</span> : (
                            <>
                                {
                                    filterName?.map((Job) => (
                                        <>
                                        <TableRow>
                                            
                                            <TableCell>{Job.CompanyName}</TableCell>
                                            <TableCell>{Job.title}</TableCell>
                                            <TableCell>{Job.createdAt.split('T')[0]}</TableCell>
                                            <TableCell className='text-right cursor-pointer'>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal />

                                                    </PopoverTrigger>
                                                    <PopoverContent className=' w-32'>
                                                        <div onClick={()=>navigate(`/admin/companies/${Job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>

                                                            <Edit2 className='w-4' />
                                                            <span>Edit</span>
                                                        </div>
                                                        <div onClick={()=>navigate(`/admin/jobs/${Job._id}/applicants`)} className='flex irems-center w-fit cursor-pointer mt-2 gap-2'>
                                                            <Eye className='w-4'/>
                                                            <span>Applicants</span>

                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                            </TableRow>
                                        </>


                                    ))
                                }


                            </>
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminjobsTable