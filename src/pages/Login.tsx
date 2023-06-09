import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {loginAPI} from '../api'
import {LoginData,importLoginData} from '../interface.ts'

export default function Login() {
  const [data,setData] = useState<LoginData>({username: "",password: ""});
  const navigate = useNavigate();

  const ChangeValue = (e:importLoginData) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const submit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const { username, password} = data;
    if(validation(password,username)){
      await loginAPI({
        username,password
      }).then(res=>{
        if(res.data.status === 'success'){
          alert(res.data.message);
          navigate('/');
        }else{
          alert(res.data.message);
        }
      }).catch(err => console.log(err.message));
    }  
  }

  const validation = (password: string ,username: string) =>{
    if (username.length < 1) return alert('請輸入使用者名稱');
    if (password.length < 1) return alert('請輸入使用者密碼');
    return true;
  }

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="使用者名稱"
        name="username"
        onChange={ChangeValue}
        min='1'
        required
      />
      <input
        type="password"
        placeholder="密碼"
        name="password"
        onChange={ChangeValue}
        min='1'
        required
      />
      <button type="submit">登入</button>
      <span>
        沒有帳戶嗎? <Link to="/register">創建帳戶</Link>
      </span>
    </form>
  )
}
