import {create} from 'zustand'

interface ChatUser{
    _id: string,
    username: string,
}

interface CurrentChatUser{
    currentChatUser: ChatUser | undefined,
    setCurrentChatUser:(data:ChatUser)=>void
}

export const useCurrentChatUser = create<CurrentChatUser>((set)=>({
    currentChatUser:undefined,
    setCurrentChatUser:(data)=>set(()=>({currentChatUser : data}))
}))