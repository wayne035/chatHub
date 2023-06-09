import {useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {server,getUsersAPI} from '../api'
import Users from '../components/Users'
import Welcome from '../components/Welcome'
import Message from '../components/Message'
import Logout from '../components/Logout'
import {io,Socket} from 'socket.io-client'
import {useSelf} from '../store/selfStore'
import {useUsers} from '../store/usersStore'
import {useCurrentChatUser} from '../store/currentChatUserStore' 

export default function Chat() {
  const self = useSelf(s=>s.self)
  const {getSelf} = useSelf()
  const {getUsers} = useUsers()
  const currentChatUser = useCurrentChatUser(s=>s.currentChatUser)
  const {setCurrentChatUser} = useCurrentChatUser()
  const socket= useRef<Socket>()
  const navigate = useNavigate()

  const chatChange = (chat:{_id:string,username:string}) => {
    setCurrentChatUser(chat);
  };

  useEffect(()=>{
    getUsersAPI({ withCredentials: true })
    .then(res=>{
      if(res.data.status === 'fail'){
        navigate('/login')
      }else{
        getUsers(res.data['users'])
        getSelf(res.data['self'][0])
      }
    })
  },[])
//與 socket server 連線
  useEffect(()=>{
    if(self){
      socket.current = io(server);
      socket.current.emit('addUser',self['id'])
    }
  },[self])

  return (
    <>
      <Logout/>
      <Users changeChat={chatChange}/>
      {currentChatUser === undefined ? 
        <Welcome /> : 
        <Message currentChat={currentChatUser} socket={socket}/>
      }
    </>
  )
}
