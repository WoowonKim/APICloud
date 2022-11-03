import axios from "axios";


const axiosService = axios.create({
	baseURL: process.env.REACT_APP_BE_HOST,
	withCredentials: false,
});

export default axiosService;