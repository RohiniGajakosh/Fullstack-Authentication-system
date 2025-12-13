import axios from 'axios';

const api = axios.create({
  baseURL: 'http://<BACKEND-ALB-DNS>:3200', // replace later with ALB DNS
});

export default api;
