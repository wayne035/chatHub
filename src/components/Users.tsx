import {useState} from 'react'
interface Users{
    users:any,
    self:any,
    changeChat:(v:User)=>void
}
interface User{
    _id:string,
    username:string,
}
export default function Users({users,self,changeChat}:Users) {
  const [currentSelect, setCurrentSelect] = useState<number>();

  const changeCurrentChat = (idx: number, user: User) => {
    setCurrentSelect(idx) //選取當前user背景變色
    changeChat(user)  //聊天室窗切換
  };

  return (
    <div>
        {(users as User[]).map((user,idx)=>{
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
