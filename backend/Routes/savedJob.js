import express from 'express';
import { saveJob, unsaveJob, getSavedJobs, checkIfJobSaved } from '../Controllers/savedJob.js';
import { isauthenticated } from '../Middlewares/Auth.js';

const router = express.Router();

// Save a job
router.post('/save', isauthenticated, saveJob);

// Unsave a job
router.delete('/unsave/:jobId', isauthenticated, unsaveJob);

// Get all saved jobs for user
router.get('/saved', isauthenticated, getSavedJobs);

// Check if job is saved
router.get('/check/:jobId', isauthenticated, checkIfJobSaved);

export default router;
