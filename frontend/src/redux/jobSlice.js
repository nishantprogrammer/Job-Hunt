import { createSlice } from "@reduxjs/toolkit";
const jobSlice =  createSlice(
    {
        name:"job",
        initialState:{
            allJobs:[],
            singleJob:null,
            alladminJobs:[],
            searchJobs:"",
            searchquery:"",
            savedJobs:[],
            savedJobIds:[]
        },
        reducers:
        {
            setAllJobs :(state,action) =>
            {
                state.allJobs = action.payload
            },
            setsingleJob :(state,action)=>
            {
                state.singleJob = action.payload

            },
            setalladminJobs:(state,action)=>
            {
                state.alladminJobs = action.payload
            },
            setsearchJobs:(state,action)=>
            {
                state.searchJobs = action.payload
            },
            setsearchquery:(state,action)=>
            {
                state.searchquery = action.payload
            },
            setSavedJobs:(state,action)=>
            {
                state.savedJobs = action.payload
            },
            setSavedJobIds:(state,action)=>
            {
                state.savedJobIds = action.payload
            },
            addToSavedJobs:(state,action)=>
            {
                state.savedJobs.push(action.payload)
                state.savedJobIds.push(action.payload._id)
            },
            removeFromSavedJobs:(state,action)=>
            {
                state.savedJobs = state.savedJobs.filter(job => job._id !== action.payload)
                state.savedJobIds = state.savedJobIds.filter(id => id !== action.payload)
            }
        }
    }
)
export const {setAllJobs,setsingleJob,setalladminJobs,setsearchJobs,setsearchquery,setSavedJobs,setSavedJobIds,addToSavedJobs,removeFromSavedJobs} = jobSlice.actions
export default jobSlice.reducer
