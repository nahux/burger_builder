import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://burger-builder-react-3be16.firebaseio.com/'
});

export default axiosInstance;
