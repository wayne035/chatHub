import {useState} from 'react'
import {useUsers} from '../store/usersStore'
import {ChangeChatUser,User} from '../interface.ts'

export default function Users({changeChat}:ChangeChatUser) {
  const [currentSelect, setCurrentSelect] = useState<number>();
  const users = useUsers(s=>s.users);

  const changeCurrentChat = (idx: number, user: User) => {
    setCurrentSelect(idx); //取得當前選取哪個user
    changeChat(user);  //聊天室窗切換
  }

  const userCurrentSelect = (idx:number) =>{
    return idx === currentSelect ?'md:bg-blue border-[#3b28e7]':'md:bg-[#fff] '
  }

  const avatar = (name:string) =>{
    const color = ['#CCBBFF','#9999FF','#FFCCCC','#FF77FF','#F4A460','#228B22','#008B8B','#008800','#FF5511','#C71585']
    const bg = color[Math.floor(Math.random() * 10)]
    return (
      <div className='flex justify-center items-center w-10 h-10 rounded-[50%] border-2  border-[#000] mr-4'
           style={{ backgroundColor: bg }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div className='p-2 h-[90vh] overflow-auto bg-[#baf0e7] md:h-full'>
        {users.map((user,idx)=>{
          return (
            <div key={user._id} 
                 onClick={()=>changeCurrentChat(idx,user)}
                 className={`${userCurrentSelect(idx)} flex items-center cursor-pointer text-[30px] md:text-[20px] font-black border-2 border-blue rounded-md my-2 p-2 md:hover:text-white md:hover:bg-blue md:hover:border-[#3b28e7] md:duration-300 shadow-xl bg-white`}
            >
              {avatar(user.username)}{user.username}
            </div>
          )
        })}
    </div>
    
  )
}
