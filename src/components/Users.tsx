import {useState} from 'react'
import {useSelf} from '../store/selfStore'
import {useUsers} from '../store/usersStore'

interface Users{
    changeChat:(v:User)=>void
}

interface User{
    _id:string,
    username:string,
}

export default function Users({changeChat}:Users) {
  const [currentSelect, setCurrentSelect] = useState<number>();
  const self = useSelf(s=>s.self)
  const users = useUsers(s=>s.users)

  const changeCurrentChat = (idx: number, user: User) => {
    setCurrentSelect(idx) //取得當前選取哪個user
    changeChat(user)  //聊天室窗切換
  };

  return (
    <div>
        {users.map((user,idx)=>{
          return (
            <div key={user._id} 
                 onClick={()=>changeCurrentChat(idx,user)}
                 className={`${idx === currentSelect ?'bg-[#f00]':'bg-[#fff]'}  text-[30px]`}
            >
              {user.username}
            </div>
          )
        })}
        <h1 className='text-[#c0c]'>{self['name']}</h1>
    </div>
    
  )
}
