import axios from 'axios'

axios.defaults.withCredentials = true;
export const server = 'http://localhost:8000';
//type
const auth = server + '/api/auth';
const userdata = server + '/api/userdata';
//auth API
export const loginAPI = (data:{}) => axios.post(auth + '/login',data);
export const registerAPI =(data:{}) => axios.post( auth +'/register',data);
export const logoutAPI = () => axios.get(auth + '/logout');
//userdata API
export const getUsersAPI = (data:{}) => axios.get(userdata + '/all',data);
export const addmsgAPI = (data:{}) => axios.post(userdata +'/addmsg',data);
export const getmsgAPI = (data:{}) => axios.post(userdata + '/getmsg',data);