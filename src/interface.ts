export interface LoginData{
    username: string,
    password: string,
}
export interface importLoginData{
    target:{
      name:string,
      value:string,
    },
}
export interface registerData{
    username: string,
    email: string,
    password: string,
    confirmPassWord: string,
}
export interface importRegisterData{
    target:{
      name:string,
      value:string,
    },
}
export interface selfMessage {
    fromSelf: boolean,
    message: string,
    currentTime:string,
}
export interface SendMessageProps {
    sendMessage: (msg: string) => void,
}
export interface User{
    _id:string,
    username:string,
}
export interface ChangeChatUser{
    changeChat:(v:User)=>void,
}