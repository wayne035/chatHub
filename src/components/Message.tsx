import {useState,useEffect,useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import SendMessage from './SendMessage'
import axios from 'axios'

export default function Message({currentChat,self,socket}:any) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMsg,setArrivalMsg] = useState();

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


  const sendMessage = (msg:any)=>{

    socket.current.emit('sendMsg',{
      from :self['id'],
      to:currentChat._id,
      msg,
    })

    axios.post('http://localhost:8000/api/userdata/addmsg',{
      from :self['id'],
      to:currentChat._id,
      message:msg,
    })

    const msgs = [...messages]
    msgs.push({fromSelf : true, message : msg})
    setMessages(msgs)
  }
  console.log(messages)
  useEffect(()=>{
    if(socket.current){
      socket.current.on('msgRecieve',(msg:any)=>{
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
                {msg['message']}
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
