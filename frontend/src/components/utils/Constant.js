// Get the base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"

// Export endpoints with environment-aware base URL
export const URL_ENDPOINT = `${API_BASE_URL}/user`
export const JOB_ENDPOINT = `${API_BASE_URL}/job`
export const APPLICATION_ENDPOINT = `${API_BASE_URL}/applications`
export const COMPANY_ENDPOINT = `${API_BASE_URL}/company`
export const SAVED_JOB_ENDPOINT = `${API_BASE_URL}/savedjobs`