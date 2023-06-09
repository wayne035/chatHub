import { useNavigate } from 'react-router-dom'
import {logoutAPI} from '../api'

export default function Logout() {
  const navigate = useNavigate();
  const logout = () =>{
    logoutAPI().then(()=>{
        location.reload()
        navigate('/login')
    }).catch(err=>console.log(err.message));
  }
  
  return (
    <div onClick={logout}>Logout</div>
  )
}
