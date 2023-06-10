import { useNavigate } from 'react-router-dom'
import {logoutAPI} from '../API'

export default function Logout() {
  const navigate = useNavigate();
  const logout = () =>{
    logoutAPI().then(()=>{
        navigate('/')
    }).catch(err=>console.log(err.message));
  }
  
  return (
    <div onClick={logout}>Logout</div>
  )
}
