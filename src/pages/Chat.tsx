import {useEffect,useRef} from 'react'
import {useNavigate,Link} from 'react-router-dom'
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
      {/*手機版*/}
      <div className='md:hidden'>
        <div className='hidden'><Logout/></div>
        {currentChatUser === undefined ? <Welcome /> : <Message socket={socket}/>}
        <Users changeChat={chatChange}/>
      </div>
      {/*桌電版*/}
      <div className='hidden md:h-[100vh] md:w-[100vw] md:bg-[#a5adf1] md:flex'>
        <div className='relative flex overflow-hidden flex-wrap w-[768px] lg:w-[1024px] h-[90%] bg-[#fff] m-auto rounded-lg shadow-xl'>
          <div className='w-full h-[80px] justify-between'>
            <Welcome />
            <Link to='/'>
              <div className='absolute z-10 top-[20px] left-[35px] text-[27px]'>
              😈 😁 🤢
              </div>
            </Link>
            <div className=' absolute z-10 top-[20px] right-[20px]'>
              <Logout/>
            </div>
          </div>
          <div className='w-[30%] lg:w-[24%] mx-3 lg:mx-4 h-[80%] rounded-lg overflow-hidden border-2 border-[#4ba2f3] shadow-2xl'>
            <Users changeChat={chatChange}/>
          </div>
          <div className='w-[63%] lg:w-[69%] mx-3 lg:mx-4 h-[80%]'>
            {
              currentChatUser === undefined ? 
              (
                <div className='select hidden md:flex h-full md:bg-[#fff] rounded-lg overflow-hidden border-2 border-[#28569b] shadow-2xl justify-center'>
                  <p className='absolute top-[20%] lg:left-[40%] m-10 text-[40px] font-black text-[#fff]'>
                    選擇左邊的用戶聊天!!
                  </p>
                  <img src='./talk.gif'/>
                </div>
              )
              :
              (
                <div className='hidden md:block h-full rounded-lg overflow-hidden border-2 border-[#00f] shadow-2xl'>
                  <Message socket={socket}/>
                </div>
              )  
            }
          </div>
        </div>
      </div>
    </>

  )
}
