import {create} from 'zustand'

interface UsersData{
  _id: string,
  username: string,
}

interface Users{
  users:UsersData[],
  getUsers:(data:UsersData[])=>void
}

export const useUsers = create<Users>((set)=>({
    users:[{_id:'',username:''}],
    getUsers:(data)=>set(()=>({users:data}))
}))