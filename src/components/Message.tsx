import {useState,useEffect} from 'react'
import SendMessage from './SendMessage'
import axios from 'axios'

export default function Message({currentChat,self}:any) {
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
    async function getMsg(){
      const res = await axios.post('http://localhost:8000/api/userdata/getmsg',{
        from: self['id'],
        to:currentChat._id,
      })
      setMessages(res.data)
    }
    getMsg()
  },[currentChat])

  const sendMessage = async(msg:string)=>{
    await axios.post('http://localhost:8000/api/userdata/addmsg',{
      from :self['id'],
      to:currentChat._id,
      message:msg,
    }).then(res=>console.log(res))
  }
  return (
    <>
      <div>{currentChat.username}</div>
      {
        messages.map(msg=>{
          console.log(msg)
          return(
            <div key={msg['message']}>
              <p className={`${msg['fromSelf']?'text-right':'text-left'}`}>{msg['message']}</p>
            </div>
          )
        })
      }
      <SendMessage sendMessage={sendMessage}/>
    </>
  )
}
