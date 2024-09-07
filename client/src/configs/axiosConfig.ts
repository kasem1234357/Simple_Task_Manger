import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://localhost:8800/', //http://localhost:8800
    withCredentials:false,

    
});

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
export default instance;