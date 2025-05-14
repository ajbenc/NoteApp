import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // Add timeout
});

// Add request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



// Response interceptor to handle errors
// Add response interceptor to unwrap data
api.interceptors.response.use(
  response => response.data, // Directly return data
  error => Promise.reject(error)
);

export const getNotes = () => api.get('/api/notes');
export const createNote = (noteData) => api.post('/api/notes', noteData);
export const getSecretNotes = (answer) => api.post('/api/notes/secret', { answer });