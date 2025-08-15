import { createSlice } from "@reduxjs/toolkit";
const applicantSlice = createSlice(
    {
        name:"applicant",
        initialState:{
            applicants:[],
            appliedJobs:[]
        },
        reducers:{
            setapplicants:(state,action)=>
            {
                state.applicants = action.payload
            },
            setappliedJobs:(state,action)=>
            {
                state.appliedJobs = action.payload
            },
        }
    }
)
export const {setapplicants,setappliedJobs} = applicantSlice.actions
export default applicantSlice.reducer