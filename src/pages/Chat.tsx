import { useState,useEffect,useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Users from '../components/Users'
import Welcome from '../components/Welcome'
import Message from '../components/Message'
import Logout from '../components/Logout'
import {io} from 'socket.io-client'

export default function Chat() {
  const [users,setUsers]=useState([])
  const [self,setSelf]=useState([])
  const [currentChat, setCurrentChat] = useState();

  const socket= useRef()

  const navigate = useNavigate()

  const chatChange = (chat:any) => {
    setCurrentChat(chat);
  };
  
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:8000/api/userdata/all',{ withCredentials: true })
    .then(res=>{
      if(res.data.status === 'fail'){
        navigate('/login')
      }else{
        setUsers(res.data['users'])
        setSelf(res.data['self'][0])
      }
    })
  },[])

  useEffect(()=>{
    if(self){
      socket.current = io('http://localhost:8000');
      socket.current.emit('addUser',self['id'])
    }
  },[self])


  return (
    <>
      <Logout/>
      <Users users={users} self={self} changeChat={chatChange}/>
      {currentChat === undefined ? 
        <Welcome self={self}/> : 
        <Message currentChat={currentChat} self={self} socket={socket}/>
      }
    </>
  )
}
