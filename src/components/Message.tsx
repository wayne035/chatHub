import {useState,useEffect,useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import SendMessage from './SendMessage'
import {addmsgAPI,getmsgAPI} from '../API.ts'
import {useSelf} from '../store/selfStore'
import {useCurrentChatUser} from '../store/currentChatUserStore' 
import {selfMessage} from '../interface.ts'
import {GrLinkPrevious} from 'react-icons/gr'

export default function Message({socket}:any) {

  const currentChatUser = useCurrentChatUser(s=>s.currentChatUser);
  const {setCurrentChatUser} = useCurrentChatUser();
  const self = useSelf(s=>s.self);
  const [messages, setMessages] = useState<selfMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [arrivalMsg,setArrivalMsg] = useState<selfMessage>();

  const sendMessage = (msg:string)=>{
    const currentTime = () =>{
      const time = new Date();
      const month = (1 + time.getMonth()).toString().padStart(2,"0");
      const year = time.getFullYear().toString().padStart(2,"0");
      const day = time.getDate().toString().padStart(2,"0");
      const hour = time.getHours().toString().padStart(2,"0");
      const minute = time.getMinutes().toString().padStart(2,"0");
      return `${year}/${month}/${day} ${hour}:${minute}`;
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
    }).catch(err => console.log(err.message));

    const msgs = [...messages]
    msgs.push({fromSelf : true, message : msg, currentTime:currentTime()});
    setMessages(msgs);
  }
//取得聊天資訊
  useEffect(()=>{
    async function getMsg(){
      if(currentChatUser){
        const res = await getmsgAPI({
          from: self['id'],
          to:currentChatUser._id,
        })
        setMessages(res.data);
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

  const exit = () =>{
    setCurrentChatUser(undefined)
  }

  const fromSelf = (value:boolean) =>{
    return value ? 'justify-end':'justify-start'
  }
  const arrow = (value:boolean) =>{
    return value ? 'border-l-[#dfc79c] right-[-14px]':'border-r-[#dfc79c] left-[-14px]'
  }

  return (
    <div className='fixed w-full h-[100vh] bg-white top-0 left-0 duration-500 md:static md:h-full'>
      <div className='h-[8%] md:h-[10%] text-[24px] font-black flex justify-between p-3 items-center bg-blue text-white border-b-[#dfdeee]'>
        {currentChatUser?.username}
        <div onClick={exit} className='md:hidden leading-[30px] h-6 cursor-pointer'>
          <GrLinkPrevious/>
        </div>
      </div>
      <div className='border-2 h-[82%] md:h-[80%] overflow-y-auto overflow-x-hidden border-[#b1afaf] bg-[#e3fdce]'>
        {
          messages.map(msg=>{
            return(
              <div ref={scrollRef} key={uuidv4()} className={`${fromSelf(msg['fromSelf'])} flex w-full`}>
                <div className='relative'>
                  <div className='relative border-2 border-[#dbbd84] w-[170px] m-2 p-1 rounded-md break-words bg-[#feffb1] shadow-xl'>
                    <p className =' font-bold'>{msg['message']}</p>
                    <span className='text-[12px] font-bold text-[#777]'>
                      {msg['currentTime']}
                    </span>
                  </div>
                  <div className={`absolute border-t-4 border-b-4 border-[11px] border-b-transparent border-t-transparent top-[50%] translate-y-[-50%] ${arrow(msg['fromSelf'])}`}>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='h-[10%] p-2'>
        <SendMessage sendMessage={sendMessage}/>
      </div>  
    </div>
  )
}
