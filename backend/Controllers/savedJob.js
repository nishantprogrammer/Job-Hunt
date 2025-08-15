import { SavedJob } from '../Models/SavedJob.js';
import { Job } from '../Models/Job.js';

// Save a job for later
export const saveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.user;

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ 
                message: "Job not found", 
                success: false 
            });
        }

        // Check if already saved
        const existingSave = await SavedJob.findOne({ userId, jobId });
        if (existingSave) {
            return res.status(400).json({ 
                message: "Job already saved", 
                success: false 
            });
        }

        // Save the job
        const savedJob = await SavedJob.create({ userId, jobId });
        
        return res.status(200).json({ 
            message: "Job saved successfully", 
            success: true,
            savedJob 
        });

    } catch (error) {
        console.error("Save job error:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};

// Unsave a job
export const unsaveJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.user;

        const deletedSave = await SavedJob.findOneAndDelete({ userId, jobId });
        
        if (!deletedSave) {
            return res.status(404).json({ 
                message: "Saved job not found", 
                success: false 
            });
        }

        return res.status(200).json({ 
            message: "Job removed from saved", 
            success: true 
        });

    } catch (error) {
        console.error("Unsave job error:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};

// Get all saved jobs for a user
export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.user;

        const savedJobs = await SavedJob.find({ userId })
            .populate({
                path: 'jobId',
                populate: {
                    path: 'company'
                }
            })
            .sort({ createdAt: -1 });

        const jobs = savedJobs.map(saved => saved.jobId);

        return res.status(200).json({ 
            message: "Saved jobs retrieved successfully", 
            success: true,
            jobs 
        });

    } catch (error) {
        console.error("Get saved jobs error:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};

// Check if a job is saved by user
export const checkIfJobSaved = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.user;

        const savedJob = await SavedJob.findOne({ userId, jobId });
        
        return res.status(200).json({ 
            message: "Check completed", 
            success: true,
            isSaved: !!savedJob 
        });

    } catch (error) {
        console.error("Check job saved error:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};
