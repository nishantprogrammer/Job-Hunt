import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_ENDPOINT } from '../utils/Constant'
const shortListingStatus = ["Accepted", "Rejected", "Viewed"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.applicant)


    const statusHandler = async (status, id) => {
        try {
            const res = await axios.put(`${APPLICATION_ENDPOINT}/status/${id}`, { status }, {
                withCredentials: true
            })
            if (res.data.success) {

                toast.success(res.data.success.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)

        }

    }
    return (
        <div>
            <Table>
                <TableCaption>A list of  recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>

                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.userId?.name}</TableCell>
                                <TableCell>{item.userId.email}</TableCell>
                                <TableCell>{item.userId.phoneNumber}</TableCell>

                                
                                    {item.userId.profile.resume ? (

                                        <TableCell  ><a href={item.userId.profile.resume} onClick={()=>statusHandler("Viewed",item._id)}><span className='text-blue-700'>Resume</span></a></TableCell>) : (<span>NA</span>)
                                    }
                                



                                <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortListingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </PopoverContent>
                                    </Popover>


                                </TableCell>
                            </TableRow>

                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable