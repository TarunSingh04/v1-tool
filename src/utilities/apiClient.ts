import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI || 'http://localhost:8000', // Replace with FastAPI URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;