import axios from 'axios'

axios.defaults.withCredentials = true;

export const host = 'http://localhost:8000'

const auth = host + '/api/auth'
const userdata = host + '/api/userdata'

//auth API
export const loginAPI = (data:{}) => axios.post(auth + '/login',data)
export const registerAPI =(data:{}) => axios.post( auth +'/register',data)
export const logoutAPI = () => axios.get(auth + '/logout')

//userdata API
export const getUsersAPI = (data:{}) => axios.get(userdata + '/all',data)
export const addmsgAPI = (data:{}) => axios.post(userdata +'/addmsg',data)
export const getmsgAPI = (data:{}) => axios.post(userdata + '/getmsg',data)