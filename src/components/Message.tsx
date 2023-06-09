import {useState,useEffect,useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import SendMessage from './SendMessage'
import axios from 'axios'

interface Message {
  fromSelf: boolean;
  message: string;
  currentTime?:string;
}

export default function Message({currentChat,self,socket}:any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [arrivalMsg,setArrivalMsg] = useState<Message>();

  useEffect(()=>{
    async function getMsg(){
      if(currentChat){
        const res = await axios.post('http://localhost:8000/api/userdata/getmsg',{
          from: self['id'],
          to:currentChat._id,
        })
        setMessages(res.data)
      }
    }
    getMsg()
  },[currentChat])


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
      to:currentChat._id,
      msg,
      currentTime:currentTime(),
    })

    axios.post('http://localhost:8000/api/userdata/addmsg',{
      from :self['id'],
      to:currentChat._id,
      message:msg,
      currentTime:currentTime(),
    })

    const msgs = [...messages]
    msgs.push({fromSelf : true, message : msg, currentTime:currentTime()})
    setMessages(msgs)
  }

  useEffect(()=>{
    if(socket.current){
      socket.current.on('msgRecieve',(msg:string)=>{
        setArrivalMsg({ fromSelf: false, message: msg });
      })
    }
  },[])

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  },[arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div>{currentChat.username}</div>
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
