import axios from "axios";

const localEndpoint = 'http://localhost:4000/api'

const axiosInstance = axios.create({
  baseURL: localEndpoint,
});

export default axiosInstance