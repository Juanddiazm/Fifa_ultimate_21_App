import axios from 'axios';
import { config } from './config';

const axiosClient = axios.create({
    baseURL: config.api.apiURL,
    headers: {'ApiKey': process.env.REACT_APP_API_KEY}
});

export default axiosClient;