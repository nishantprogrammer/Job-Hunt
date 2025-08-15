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
     MONGODB_URI=mongodb://localhost:27017/job-portal
     SECRET_KEY=your-secret-key
     PORT=8000
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

- **Backend**: Deploy to Render
- **Frontend**: Deploy to Vercel or Netlify

## 👨‍💻 Author

[Nishant Programmer](https://github.com/nishantprogrammer)