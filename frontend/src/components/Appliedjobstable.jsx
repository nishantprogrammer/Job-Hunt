import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'


const Appliedjobstable = () => {
    const {appliedJobs} = useSelector(store=>store.applicant)
  return (
    <div>
        <Table>
            <TableCaption>A list of Applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    appliedJobs.length<=0?<span>You have not Applied To Any Job</span>: appliedJobs?.map((element,index)=>{
                        return(
                        <TableRow key = {index}>
                        <TableCell>{element.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{element?.job?.title}</TableCell>
                        <TableCell>{element?.job?.company?.name}</TableCell>
                        <TableCell className='text-right' ><Badge className={`${element.status=="Rejected"?'bg-red-500':element.status=="Accepted"?'bg-green-500':'bg-gray-400'}`}>{element?.status}</Badge></TableCell>
                        </TableRow>
                    )})
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default Appliedjobstable