import { useState,useEffect,useRef, SetStateAction } from 'react'
import {useNavigate} from 'react-router-dom'
import {host,getUsersAPI} from '../api'
import Users from '../components/Users'
import Welcome from '../components/Welcome'
import Message from '../components/Message'
import Logout from '../components/Logout'
import {io,Socket} from 'socket.io-client'

interface Users{
  _id: string,
  username: string,
}

interface Self{
  name:string,
  id:string,
}

export default function Chat() {
  const [users,setUsers]=useState<Users[]>([{_id:'',username:''}])
  const [self,setSelf]=useState<Self>({name:'',id:''})
  const [currentChat, setCurrentChat] = useState();

  const socket= useRef<Socket>()

  const navigate = useNavigate()

  const chatChange = (chat:SetStateAction<undefined>) => {
    setCurrentChat(chat);
  };

  useEffect(()=>{
    getUsersAPI({ withCredentials: true })
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
      socket.current = io(host);
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
