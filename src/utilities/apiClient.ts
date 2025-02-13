import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI || 'https://api.impakter.pro', // Replace with FastAPI URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
