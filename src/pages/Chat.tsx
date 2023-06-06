import { useState,useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Chat() {
  const [isLogin,setIsLogin]=useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:8000/api/user',{ withCredentials: true })
    .then(res=>{
      console.log(res.data.status)
      if(res.data.status === 'fail'){
        alert('請先登入')
        navigate('/login')
      }else{
        setIsLogin(true)
      }
    })
  },[])
  return (
    <>
    { isLogin ? <div>Chat</div> : null }
    </>
    
  )
}
