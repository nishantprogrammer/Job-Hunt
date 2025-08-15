
import React, { useState, useEffect } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useSavedJobs from '@/hooks/useSavedJobs'
import { toast } from 'sonner'
import { addToSavedJobs } from '@/redux/jobSlice'

const jobid="jshdcbsbhcjbc"

const Job = ({job}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)
    const { savedJobIds } = useSelector(store => store.job)
    const { saveJob, unsaveJob } = useSavedJobs()
    const [isSaved, setIsSaved] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const daysAgoFUnction = (mongoDbTime)=>
    {
        const createdAt = new Date(mongoDbTime);
        const currenttime = new Date();
        const timeDifference =  currenttime - createdAt
        return Math.floor(timeDifference/(1000*60*60*24)) 
    }

    // Check if job is saved on component mount
    useEffect(() => {
        setIsSaved(savedJobIds.includes(job._id))
    }, [savedJobIds, job._id])

    const handleSaveJob = async () => {
        if (!user) {
            toast.error('Please login to save jobs')
            return
        }

        setIsLoading(true)
        try {
            if (isSaved) {
                const result = await unsaveJob(job._id)
                if (result.success) {
                    setIsSaved(false)
                    toast.success('Job removed from saved')
                } else {
                    toast.error(result.message)
                }
            } else {
                const result = await saveJob(job._id)
                if (result.success) {
                    setIsSaved(true)
                    dispatch(addToSavedJobs(job))
                    toast.success('Job saved successfully')
                } else {
                    toast.error(result.message)
                }
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className='border border-gray-200 shadow-lg rounded-md p-4'>
        <div className='flex justify-between'>

        <h1 className='text-sm text-gray-600'>{daysAgoFUnction(job.createdAt)==0? "Today":`${daysAgoFUnction(job.createdAt)} days ago`}</h1>
        <button 
            onClick={handleSaveJob}
            disabled={isLoading}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isSaved ? 'text-blue-600' : 'text-gray-400'} sm:p-1`}
        >
            {isSaved ? <BookmarkCheck size={20} className="sm:w-5 sm:h-5 w-6 h-6" /> : <Bookmark size={20} className="sm:w-5 sm:h-5 w-6 h-6" />}
        </button>
        </div>
        <div className='flex items-center my-2 gap-2'>
            <div>
                <Button variant='outline' className= "p-4 sm:p-6"  size="icon">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                        <AvatarImage src={job?.company.logo} />
                    </Avatar>
                </Button>

            </div>
            <div className="min-w-0 flex-1">
                <h1 className='font-medium text-base sm:text-lg truncate'>{job.CompanyName}</h1>
                <p className='text-xs sm:text-sm text-gray-600'>India</p>

            </div>
        </div>
        <div>
            <h1 className='font-bold text-base sm:text-lg my-2 line-clamp-2'>{job.title}</h1>
            <p className='text-xs sm:text-sm text-gray-600 line-clamp-3'>{job.description}</p>
        </div>
         <div className='flex flex-wrap items-center gap-1 sm:gap-2 p-2 mt-4'>
       <Badge className={'text-blue-700 font-bold text-xs'} variant="ghost">{job.position}Positions</Badge>
       <Badge className={'text-[#F83002] font-bold text-xs'} variant="ghost">{job.jobtype}</Badge>
       <Badge className={'text-[#7209B7] font-bold text-xs'} variant="ghost">{job.salary}</Badge>

    </div>
    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mt-4'>
        <Button 
            onClick={()=>navigate(`/description/${job._id}`)} 
            variant="outline"
            className="flex-1 sm:flex-none"
        >
            Details
        </Button>
        <Button 
            onClick={handleSaveJob}
            disabled={isLoading}
            className={`${isSaved ? 'bg-gray-600' : 'bg-[#7209B7]'} hover:bg-[#5f32ad] flex-1 sm:flex-none text-sm sm:text-base py-2 sm:py-1`}
        >
            {isLoading ? 'Loading...' : (isSaved ? 'Saved' : 'Save For Later')}
        </Button>
    </div>

    </div>
  )
}

export default Job