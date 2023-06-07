import {useState} from 'react'

export default function Message({currentChat}:any) {
  const [messages, setMessages] = useState([]);
  return (
    <>
      <div>message {currentChat.username}</div>
    </>
  )
}
