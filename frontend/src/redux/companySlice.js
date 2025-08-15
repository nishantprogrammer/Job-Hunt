import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice(
    {
        name:"company",
        initialState:{
            singleCompany:null,
            companies:[],
            searchCompany:""
        },
   
    
        reducers:
        {
            setsingleCompany:(state,action)=>
            {
                state.singleCompany = action.payload
            },
            setcompanies:(state,action)=>
            {
                state.companies=action.payload
            },
            setsearchCompany:(state,action)=>
            {
                state.searchCompany = action.payload
            }
        }
    }
    
)
export const {setsingleCompany,setcompanies,setsearchCompany} = companySlice.actions
export default companySlice.reducer