import {useState} from 'react'
import {useSelf} from '../store/selfStore'
import {useUsers} from '../store/usersStore'
import {ChangeChatUser,User} from '../interface.ts'

export default function Users({changeChat}:ChangeChatUser) {
  const [currentSelect, setCurrentSelect] = useState<number>();
  const self = useSelf(s=>s.self);
  const users = useUsers(s=>s.users);

  const changeCurrentChat = (idx: number, user: User) => {
    setCurrentSelect(idx); //取得當前選取哪個user
    changeChat(user);  //聊天室窗切換
  }

  const userCurrentSelect = (idx:number) =>{
    return idx === currentSelect ?'bg-[#f00]':'bg-[#fff]'
  }

  return (
    <div className='p-2'>
        {users.map((user,idx)=>{
          return (
            <div key={user._id} 
                 onClick={()=>changeCurrentChat(idx,user)}
                 className={`${userCurrentSelect(idx)} cursor-pointer text-[30px] font-black border-2 border-blue rounded-md my-2 p-2 hover:text-white hover:bg-blue hover:border-[#3b28e7] duration-500 shadow-xl`}
            >
              {user.username}
            </div>
          )
        })}
        <div className='hidden text-[#c0c]'>
          {self['name']}
        </div>
    </div>
    
  )
}
