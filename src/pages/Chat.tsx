import {useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {server,getUsersAPI} from '../API'
import {io,Socket} from 'socket.io-client'
import {useSelf} from '../store/selfStore'
import {useUsers} from '../store/usersStore'
import {useCurrentChatUser} from '../store/currentChatUserStore'
import {User} from '../interface.ts' 
import Users from '../components/Users'
import Welcome from '../components/Welcome'
import Message from '../components/Message'
import Logout from '../components/Logout'

export default function Chat() {
  const self = useSelf(s=>s.self);
  const {getSelf} = useSelf();
  const {getUsers} = useUsers();
  const currentChatUser = useCurrentChatUser(s=>s.currentChatUser);
  const {setCurrentChatUser} = useCurrentChatUser();
  const socket= useRef<Socket>();
  const navigate = useNavigate();

  useEffect(()=>{
    getUsersAPI({ withCredentials: true })
    .then(res=>{
      if(res.data.status === 'fail'){
        navigate('/login')
      }else{
        getUsers(res.data['users'])
        getSelf(res.data['self'][0])
      }
    }).catch(err => console.log(err.message));
  },[])
//與 socket server 連線
  useEffect(()=>{
    if(self){
      socket.current = io(server);
      socket.current.emit('addUser',self['id'])
    }
  },[self])

  const chatChange = (chat:User) => {
    setCurrentChatUser(chat);
  }

  return (
    <>
      <Logout/>
      <Users changeChat={chatChange}/>
      {currentChatUser === undefined ? <Welcome /> : <Message socket={socket}/>}
    </>
  )
}
