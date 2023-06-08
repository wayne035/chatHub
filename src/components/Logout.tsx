import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const navigate = useNavigate()
  const logout = () =>{
    axios.get('http://localhost:8000/api/auth/logout')
    .then(()=>{
        location.reload()
        navigate('/login')
    }).catch(err=>console.log(err.message))
  }
  return (
    <div onClick={logout}>Logout</div>
  )
}
