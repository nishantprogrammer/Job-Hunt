import { SAVED_JOB_ENDPOINT } from '@/components/utils/Constant'
import { setSavedJobs, setSavedJobIds, addToSavedJobs, removeFromSavedJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useSavedJobs = () => {
    const dispatch = useDispatch()

    // Fetch all saved jobs
    const fetchSavedJobs = async () => {
        try {
            const res = await axios.get(`${SAVED_JOB_ENDPOINT}/saved`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setSavedJobs(res.data.jobs))
                dispatch(setSavedJobIds(res.data.jobs.map(job => job._id)))
            }
        } catch (error) {
            console.error("Fetch saved jobs error:", error)
        }
    }

    // Save a job
    const saveJob = async (jobId) => {
        try {
            const res = await axios.post(`${SAVED_JOB_ENDPOINT}/save`, { jobId }, { withCredentials: true })
            if (res.data.success) {
                // Find the job from allJobs and add to saved
                // This will be handled by the component calling this function
                return { success: true, message: res.data.message }
            }
        } catch (error) {
            console.error("Save job error:", error)
            return { success: false, message: error.response?.data?.message || 'Failed to save job' }
        }
    }

    // Unsave a job
    const unsaveJob = async (jobId) => {
        try {
            const res = await axios.delete(`${SAVED_JOB_ENDPOINT}/unsave/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                dispatch(removeFromSavedJobs(jobId))
                return { success: true, message: res.data.message }
            }
        } catch (error) {
            console.error("Unsave job error:", error)
            return { success: false, message: error.response?.data?.message || 'Failed to unsave job' }
        }
    }

    // Check if job is saved
    const checkIfJobSaved = async (jobId) => {
        try {
            const res = await axios.get(`${SAVED_JOB_ENDPOINT}/check/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                return res.data.isSaved
            }
        } catch (error) {
            console.error("Check job saved error:", error)
            return false
        }
    }

    return {
        fetchSavedJobs,
        saveJob,
        unsaveJob,
        checkIfJobSaved
    }
}

export default useSavedJobs
