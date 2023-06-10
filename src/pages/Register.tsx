import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {registerAPI} from '../API.ts'
import {registerData,importRegisterData} from '../interface.ts'

export default function Register() {
  const [data,setData] = useState<registerData>({
    username: "",
    email: "",
    password: "",
    confirmPassWord: "",
  });
  const navigate = useNavigate();

  const ChangeValue = (e: importRegisterData ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const submit = async(e: { preventDefault: () => void })=>{
    e.preventDefault();
    const { email, username, password,confirmPassWord} = data;
    if(validation(password,confirmPassWord)){
      await registerAPI({
        username,email,password
      }).then(res=>{
        if(res.data.status === 'success'){
          alert(res.data.message);
          navigate('/login');
        }else{
          alert(res.data.message);
        }
      }).catch(err => console.log(err.message));
    }  
  }

  const validation = (password: string ,confirmPassWord: string) =>{
    if (password !== confirmPassWord) return alert('密碼確認不正確')
    if (password.length < 10) return alert('密碼需要10個字以上組成')
    return true
  }

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="使用者名稱"
        name="username"
        onChange={ChangeValue}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        name="email"
        onChange={ChangeValue}
        required
      />
      <input
        type="password"
        placeholder="密碼(需設置10碼以上)"
        name="password"
        onChange={ChangeValue}
        required
      />
      <input
        type="password"
        placeholder="確認密碼"
        name="confirmPassWord"
        onChange={ChangeValue}
        required
      />
      <button type="submit">建立使用者</button>
      <span>
        己經有帳戶了? <Link to="/login">登入</Link>
      </span>
    </form>
  )
}
