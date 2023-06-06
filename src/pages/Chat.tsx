import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Users from '../components/Users'

export default function Chat() {
  const [isLogin,setIsLogin]=useState(false)
  const [users,setUsers]=useState([])
  const [self,setSelf]=useState('')
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:8000/api/userdata/all',{ withCredentials: true })
    .then(res=>{
      if(res.data.status === 'fail'){
        alert(res.data.message)
        navigate('/login')
      }else{
        setIsLogin(true)
        setUsers(res.data['users'])
        setSelf(res.data['self'])
      }
    })
  },[])
  return (
    <>
    { isLogin ? (
      <Users users={users} self={self}/>
    ) : null }
    </>
  )
}
