import { useNavigate } from 'react-router-dom'
import {logoutAPI} from '../API'
import {ImExit} from 'react-icons/im'

export default function Logout() {
  const navigate = useNavigate();
  const logout = () =>{
    if(confirm('你確定要登出?'))
    logoutAPI().then(()=>{
        navigate('/')
    }).catch(err=>console.log(err.message));
  }
  
  return (
    <div onClick={logout} className='border-2 border-[#000] rounded-[5px] p-1 bg-white hover:border-blue hover:text-blue duration-500'>
      <ImExit className='w-7 h-7 bg-[#fff] '/>
    </div>
  )
}
