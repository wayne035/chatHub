import {create} from 'zustand'

interface selfData{
  name:string,
  id:string,
}

interface Self{
    self:selfData,
    isLogin:boolean,
    getSelf:(data:selfData)=> void
    setLogin:(data:boolean)=> void
}

export const useSelf = create<Self>((set)=>({
    self:{name:'',id:''},
    isLogin:false,
    getSelf:(data)=>set(()=>({self:data})),
    setLogin:(data)=>set(()=>({isLogin:data})),
}))