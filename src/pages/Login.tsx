import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {loginAPI} from '../API.ts'
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
          navigate('/chat');
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
    <div className='bg-blue h-[100vh] pt-20 bg-gradient-to-b from-blue to-[#3f91d4]'>
      <form onSubmit={submit}
            className='m-auto flex flex-wrap w-[350px] p-4 border-[1px] rounded-[6px] shadow-2xl bg-[#fff]'
      >
        <div className='w-full flex justify-center text-[30px] text-center font-black my-[10px]'>
          登入
          <div className='bg-blue text-[#fff] rounded-[5px] px-1'>
            頁面
          </div>
        </div>
        <input
          className='w-full rounded-[3px] ring m-4 h-[40px] p-3 font-bold'
          type="text"
          placeholder="使用者名稱"
          name="username"
          onChange={ChangeValue}
          min='1'
          required
        />
        <input
          className='w-full rounded-[3px] ring m-4 h-[40px] p-3 font-bold'
          type="password"
          placeholder="密碼"
          name="password"
          onChange={ChangeValue}
          min='1'
          required
        />
        <button type="submit"
                className='m-auto my-3 text-[24px] font-black border-[2px] border-blue px-4 py-1 rounded-[5px] hover:bg-btncolor hover:text-[#fff] duration-300 hover:border-[#185894]'
        >
          登入
        </button>
        <span className='w-full m-2 text-center'>
          沒有帳戶嗎? 
          <Link to="/register" className='text-[#aaa] hover:text-[#000] ml-2'>
            創建帳戶
          </Link>
        </span>
      </form>
    </div>
  )
}
