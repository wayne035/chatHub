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
    <div className='h-[100vh] pt-20 bg-gradient-to-b from-blue to-[#3f91d4]'>
      <form onSubmit={submit}
            className='m-auto flex flex-wrap w-[350px] p-4 border-[1px] rounded-[6px] shadow-2xl bg-[#fff]'
      >
        <div className='w-full flex justify-center text-[30px] text-center font-black my-[10px]'>
          註冊
          <div className='bg-blue text-[#fff] rounded-[5px] px-1'>
            頁面
          </div>
        </div>
        <input
          className='w-full rounded-[3px] ring m-[14px] h-[40px] p-3 font-bold'
          type="text"
          placeholder="使用者名稱"
          name="username"
          onChange={ChangeValue}
          required
        />
        <input
          className='w-full rounded-[3px] ring m-[14px] h-[40px] p-3 font-bold'
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={ChangeValue}
          required
        />
        <input
          className='w-full rounded-[3px] ring m-[14px] h-[40px] p-3 font-bold'
          type="password"
          placeholder="密碼(需設置10碼以上)"
          name="password"
          onChange={ChangeValue}
          required
        />
        <input
          className='w-full rounded-[3px] ring m-[14px] h-[40px] p-3 font-bold'
          type="password"
          placeholder="確認密碼"
          name="confirmPassWord"
          onChange={ChangeValue}
          required
        />
        <button type="submit"
                className='m-auto my-3 text-[24px] font-black border-[2px] border-blue px-4 py-1 rounded-[5px] hover:bg-btncolor hover:text-[#fff] duration-300 hover:border-[#185894]'
        >
          註冊
        </button>
        <span className='w-full m-2 text-center'>
          己經有帳戶了? 
          <Link to="/login" className='text-[#aaa] hover:text-[#000] ml-2'>
            登入
          </Link>
        </span>
      </form>
    </div>
  )
}
