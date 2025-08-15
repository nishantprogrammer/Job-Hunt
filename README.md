# 🚀 Job Portal - Full Stack Application

A comprehensive job portal application featuring a modern React frontend and robust Node.js backend.

## 🏗️ Architecture Overview

- **Frontend**: Built with React 19, Redux Toolkit for state management, and Tailwind CSS for rapid UI development. The interface is fully responsive and optimized for both desktop and mobile devices.
- **Backend**: Powered by Node.js and Express, with MongoDB as the database. Implements RESTful APIs and secure authentication using JWT stored in HTTP-only cookies.

## ✨ Key Features

- **Authentication**: Secure login and registration using JWT; supports role-based access for Students and Recruiters.
- **Role Management**: Students can browse, apply, and save jobs; Recruiters can post jobs and manage applications.
- **Job Management**: CRUD operations for job postings and applications.
- **Save for Later**: Users can bookmark jobs for future reference.
- **Responsive Design**: Seamless experience across devices.

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nishantprogrammer/Job-Hunt.git
   cd Job-Hunt
   npm run install:all
   ```

2. **Configure Environment**
   - Create a `.env` file in the backend folder:
     ```env
     MONGO_URI=mongodb://localhost:27017/job-portal
     SECRET_KEY=your-secret-key
     PORT=8000
     FRONTEND_URL=http://localhost:5173
     CLOUD_NAME=your-cloud-name
     API_KEY=your-api-key
     API_SECRET=your-api-secret
     ```
   - Create a `.env` file in the frontend folder:
     ```env
     VITE_API_BASE_URL=http://localhost:8000/api/v1
     ```

3. **Run Development Servers**
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Frontend**: React 19, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (HTTP-only cookies)

## 📱 User Roles

- **Students**: Browse jobs, apply, save favorites
- **Recruiters**: Post jobs, manage applications

## 🚀 Deployment

### Backend Deployment

#### Option 1: Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Environment Variables**: Add all variables from your backend `.env` file

#### Option 2: Heroku
1. Create a new app on Heroku
2. Connect your GitHub repository
3. Configure environment variables in the Settings tab
4. Deploy the application

### Frontend Deployment

#### Option 1: Vercel
1. Import your GitHub repository
2. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add `VITE_API_BASE_URL` pointing to your deployed backend

#### Option 2: Netlify
1. Import your GitHub repository
2. Configure the project:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Environment variables**: Add `VITE_API_BASE_URL` pointing to your deployed backend

### Post-Deployment Steps

1. Update the `FRONTEND_URL` environment variable in your backend deployment to match your deployed frontend URL
2. Ensure your MongoDB instance allows connections from your backend deployment (whitelist IP in MongoDB Atlas)
3. Test the complete application flow to verify everything is working correctly

### Troubleshooting

- **CORS Issues**: Verify that the `FRONTEND_URL` in your backend environment matches your actual frontend URL
- **Database Connection**: Check that your `MONGO_URI` is correct and that network access is properly configured
- **Cloudinary Uploads**: Verify your Cloudinary credentials are correct
- **Build Errors**: If you encounter build errors on Render, ensure the build command is correctly set to `cd backend && npm install`

## 👨‍💻 Author

[Nishant Programmer](https://github.com/nishantprogrammer)