import mongoose from 'mongoose'

const savedJobSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required: true
        }
    },
    { timestamps: true }
);

// Compound index to prevent duplicate saves
savedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export const SavedJob = mongoose.model("SavedJob", savedJobSchema);
