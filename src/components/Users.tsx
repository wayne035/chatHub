import React from 'react'

interface Users{
    users: object[],
    self:string,
}
interface User{
    _id:string,
    username:string,
}
export default function Users({users,self}:Users) {

  const changeCurrentChat = (idx: number, user: User) => {
    console.log(idx,user)
  };

  return (
    <>
        {(users as User[]).map((user,idx)=>{
          return (
            <div key={user._id} onClick={()=>changeCurrentChat(idx,user)}>
              {user.username}
            </div>
          )
        })}
        <h1 className='text-[#c0c]'>{self}</h1>
    </>
    
  )
}
