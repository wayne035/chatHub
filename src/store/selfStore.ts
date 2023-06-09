import {create} from 'zustand'

interface selfData{
  name:string,
  id:string,
}

interface Self{
    self:selfData,
    getSelf:(data:selfData)=> void
}

export const useSelf = create<Self>((set)=>({
    self:{name:'',id:''},
    getSelf:(data)=>set(()=>({self:data}))
}))