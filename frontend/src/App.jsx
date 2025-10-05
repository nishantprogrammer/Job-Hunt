import React from 'react'
import Navbar from './components/shared/Navbar'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import SavedJobs from './components/SavedJobs'
import Companies from './components/admin/Companies'
import Adminjobs from './components/admin/Adminjobs'
import CreateCompany from './components/admin/CreateCompany'
import CompanyUpdate from './components/admin/CompanyUpdate'
import CreateJobs from './components/admin/CreateJobs'
import Applicants from './components/admin/Applicants'
import Protectedroutes from './components/admin/Protectedroutes'

// Catch-all component for 404
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <Navigate to="/" replace />
    </div>
  </div>
)

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/saved-jobs",
    element:<SavedJobs/>
  },
  // admin
  {
    path:"/admin/companies",
    element:<Protectedroutes> <Companies/></Protectedroutes>
  },
  {
    path:"/admin/jobs",
    element: <Protectedroutes><Adminjobs/></Protectedroutes>
  },
  {
    path:"/admin/companies/create",
    element: <Protectedroutes><CreateCompany/></Protectedroutes>
  },
  {
    path:"/admin/companies/:CompanyId",
    element: <Protectedroutes><CompanyUpdate/></Protectedroutes>
  },
  {
    path:"/admin/jobs/create",
    element: <Protectedroutes><CreateJobs/></Protectedroutes>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Protectedroutes><Applicants/></Protectedroutes>
  },
  // Catch-all route for 404 - must be last
  {
    path:"*",
    element:<NotFound/>
  }
])

const App = () => {
  return (
    <>
    <RouterProvider router = {appRouter} />
    </>
  )
}

export default App
