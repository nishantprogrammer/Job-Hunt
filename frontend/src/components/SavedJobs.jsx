import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import useSavedJobs from '@/hooks/useSavedJobs'
import { BookmarkCheck } from 'lucide-react'

const SavedJobs = () => {
  const { savedJobs } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const { fetchSavedJobs } = useSavedJobs()

  useEffect(() => {
    if (user) {
      fetchSavedJobs()
    }
  }, [user])

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto my-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to view saved jobs</h1>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
             <div className="max-w-7xl mx-auto my-6 sm:my-10 px-4 sm:px-6">
         <div className="flex items-center gap-2 mb-4 sm:mb-6">
           <BookmarkCheck className="text-[#7209B7] w-6 h-6 sm:w-8 sm:h-8" />
           <h1 className="text-2xl sm:text-3xl font-bold">Saved Jobs</h1>
         </div>
        
                 {savedJobs.length === 0 ? (
           <div className="text-center py-8 sm:py-10">
             <BookmarkCheck className="mx-auto text-gray-400 mb-4 w-12 h-12 sm:w-16 sm:h-16" />
             <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No saved jobs yet</h2>
             <p className="text-sm sm:text-base text-gray-500 px-4">Start saving jobs you're interested in to see them here</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
             {savedJobs.map((job) => (
               <div key={job._id}>
                 <Job job={job} />
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  )
}

export default SavedJobs
