import {useState,useEffect,useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import SendMessage from './SendMessage'
import {addmsgAPI,getmsgAPI} from '../api'
import {useSelf} from '../store/selfStore'
import {useCurrentChatUser} from '../store/currentChatUserStore' 

interface Message {
  fromSelf: boolean;
  message: string;
  currentTime:string;
}

export default function Message({socket}:any) {
  const currentChatUser = useCurrentChatUser(s=>s.currentChatUser)
  const self = useSelf(s=>s.self)
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [arrivalMsg,setArrivalMsg] = useState<Message>();
//取得聊天資訊
  useEffect(()=>{
    async function getMsg(){
      if(currentChatUser){
        const res = await getmsgAPI({
          from: self['id'],
          to:currentChatUser._id,
        })
        setMessages(res.data)
      }
    }
    getMsg()
  },[currentChatUser])
//即時取得當前聊天使用者發送的message
  useEffect(()=>{
    if(socket.current){
      socket.current.on('msgRecieve',(msg:string ,time:string)=>{
        setArrivalMsg({ fromSelf: false, message: msg ,currentTime:time});
      })
    }
  },[])
//更新當前聊天使用者發送的message
  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  },[arrivalMsg]);

//scroll置底
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (msg:string)=>{

    const currentTime = () =>{
      const time = new Date()
      const month = (1 + time.getMonth()).toString().padStart(2,"0")
      const year = time.getFullYear().toString().padStart(2,"0")
      const day = time.getDate().toString().padStart(2,"0")
      const hour = time.getHours().toString().padStart(2,"0")
      const minute = time.getMinutes().toString().padStart(2,"0")
      return `${year}/${month}/${day} ${hour}:${minute}`
    }

    socket.current.emit('sendMsg',{
      from :self['id'],
      to:currentChatUser?._id,
      msg,
      currentTime:currentTime(),
    })

    addmsgAPI({
      from :self['id'],
      to:currentChatUser?._id,
      message:msg,
      currentTime:currentTime(),
    })

    const msgs = [...messages]
    msgs.push({fromSelf : true, message : msg, currentTime:currentTime()})
    setMessages(msgs)
  }

  return (
    <>
      <div>{currentChatUser?.username}</div>
      <div className='border-2 h-[500px] overflow-auto'>
      {
        messages.map(msg=>{
          return(
            <div ref={scrollRef} key={uuidv4()} className='border-2 w-full '>
              <div className={`${msg['fromSelf']?'text-right':'text-left'}`}>
                <p className ='text-[18px] font-bold'>{msg['message']}</p>
                <span className='text-[13px] font-bold text-[#777]'>
                  {msg['currentTime']}
                </span>
              </div>
              
            </div>
          )
        })
      }
      </div>
      <SendMessage sendMessage={sendMessage}/>
    </>
  )
}
