import {useState} from 'react'
import Picker from 'emoji-picker-react';
import {SendMessageProps} from '../interface.ts'

export default function sendMessage({sendMessage}:SendMessageProps) {
  const [msg, setMsg] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const EmojiPickerToggle = () => {
    setShowEmojiPicker(v=>!v);
  }

  const EmojiClick = (e:{ emoji: string; }) => {
    let message = msg;
    message += e.emoji;
    setMsg(message);
  }

  const sendChat = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.trim().length > 0) {
      sendMessage(msg);
      setMsg("");
    }else{
        alert('請輸入訊息...');
    }
  }

  return (
    <>
    <div onClick={EmojiPickerToggle}>toggle</div>
    {showEmojiPicker && <Picker onEmojiClick={EmojiClick}/>}
    <form onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="請輸入訊息..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">送出</button>
      </form>
    </>
    
  )
}
