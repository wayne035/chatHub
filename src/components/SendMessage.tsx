import {useState} from 'react'
import Picker from 'emoji-picker-react';
import {SendMessageProps} from '../interface.ts'
import {BiSend} from 'react-icons/bi'

export default function sendMessage({sendMessage}:SendMessageProps) {
  const [msg, setMsg] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const EmojiClick = (e:{ emoji: string; }) => {
    let message = msg;
    message += e.emoji;
    setMsg(message);
  }

  const sendChat = (e?:React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (msg.trim().length > 0) {
      sendMessage(msg);
      setMsg("");
    }else{
        alert('請輸入訊息...');
    }
  }

  const enter = (e:any) =>{
    if(e.key === "Enter"){
      e?.preventDefault();
      sendChat();
    }
  }

  return (
    <form onSubmit={(event) => sendChat(event)}
          className='flex w-full h-full items-center justify-around'
    >
      {
        showEmojiPicker && 
        <div className='absolute bottom-[10%] left-1/2 translate-x-[-50%]'>
          <Picker onEmojiClick={EmojiClick}/>
        </div>
      }
      <textarea placeholder="請輸入訊息..."
                onKeyDown={enter}
                onFocus={()=>setShowEmojiPicker(false)}
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
                className='resize-none border-2 p-1 w-[80%] h-full overflow-hidden'
      />
      <div onClick={()=>setShowEmojiPicker(v=>!v)} 
           className='cursor-pointer text-[24px] w-[10%] p-2 text-center'>
          🙂
      </div>
      <button type="submit" className='cursor-pointer text-[24px] p-2 w-[10%]'>
          <BiSend/>
      </button>
    </form>
  )
}
