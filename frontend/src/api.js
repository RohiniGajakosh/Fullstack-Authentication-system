import axios from "axios";

const api = axios.create({
  baseURL: "http://application-LB-1279897487.ap-south-1.elb.amazonaws.com/api",
});

export default api;
