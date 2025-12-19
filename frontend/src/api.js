import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://application-LB-1279897487.ap-south-1.elb.amazonaws.com/api";

export const registerUser = async (data) => {
  const res = await axios.post(`${API_BASE}/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_BASE}/login`, data);
  return res.data;
};
