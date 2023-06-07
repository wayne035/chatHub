import axios from 'axios'

export default function Logout() {
  const logout = () =>{
    axios.get('http://localhost:8000/api/auth/logout')
    .then(res=>{
        location.reload()
        alert(res.data.message)
    }).catch(err=>console.log(err.message))
  }
  return (
    <div onClick={logout}>Logout</div>
  )
}
