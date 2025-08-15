import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = () => {
    const navigate = useNavigate()
    const { companies,searchCompany } = useSelector(store => store.company)
    const [filterName,setfilterName]=useState(companies)
    useEffect(()=>
    {
        const filterdName = companies.length >=0 && companies.filter((company)=>{
            if(!searchCompany)
            {
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompany.toLowerCase())
        })
        setfilterName(filterdName)
       
    },[companies,searchCompany])
    
    return (
        <div>
            <Table>
                <TableCaption>
                    A List Of Companies
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterName.length <= 0 ? <span> No Companies Available</span> : (
                            <>
                                {
                                    filterName?.map((company) => (
                                        <>
                                        <TableRow>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage src={company.logo} />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                                            <TableCell className='text-right cursor-pointer'>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal />

                                                    </PopoverTrigger>
                                                    <PopoverContent className=' w-32'>
                                                        <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>

                                                            <Edit2 className='w-4' />
                                                            <span>Edit</span>
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

export default CompaniesTable