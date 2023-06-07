import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Users from '../components/Users'
import Welcome from '../components/Welcome'
import Message from '../components/Message'
import Logout from '../components/Logout'

export default function Chat() {
  const [users,setUsers]=useState([])
  const [self,setSelf]=useState('')
  const [currentChat, setCurrentChat] = useState();
  const navigate = useNavigate()

  const chatChange = (chat:any) => {
    setCurrentChat(chat);
  };

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:8000/api/userdata/all',{ withCredentials: true })
    .then(res=>{
      if(res.data.status === 'fail'){
        alert(res.data.message)
        navigate('/login')
      }else{
        setUsers(res.data['users'])
        setSelf(res.data['self'])
      }
    })
  },[])
  return (
    <>
      <Logout/>
      <Users users={users} self={self} changeChat={chatChange}/>
      {currentChat === undefined ? 
        <Welcome self={self}/> : 
        <Message currentChat={currentChat}/>
      }
    </>
  )
}
