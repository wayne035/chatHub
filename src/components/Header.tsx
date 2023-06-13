import { Link } from "react-router-dom"
import {useSelf} from '../store/selfStore.ts'

export default function Header() {
  const isLogin = useSelf(s=>s.isLogin);
  const cookieKey = (document.cookie).split("=")[0]

  return (
    <header className='flex justify-between bg-[#000] h-[60px] text-[#fff] fixed w-full'>
      <h1 className='leading-[60px] text-[30px] pl-[15px] cursor-default flex font-black'>
        Chat 
        <div className='leading-[44px] text-[30px] px-[3px] my-[8px] mx-[5px] cursor-default bg-blue rounded-[10px] text-center'>
          Hub
        </div>
      </h1>
      <nav className="h-full flex">
        {
          isLogin || cookieKey? 
          <Link to='/chat' 
                  className="h-full leading-[60px] text-[22px] md:text-[26px] font-black px-[8px] md:px-[25px] hover:bg-blue hover:text-[#eee] duration-500" 
          >
              聊天去!
          </Link>
          : 
          null
        }
        <Link to='/login' 
                className="h-full leading-[60px] text-[22px] md:text-[26px] font-black px-[8px] md:px-[25px] hover:bg-blue hover:text-[#eee] duration-500" 
        >
            登入
        </Link>
        <Link to='/register' 
                className="h-full leading-[60px] text-[22px] md:text-[26px] font-black px-[8px] md:px-[25px] hover:bg-blue hover:text-[#eee] duration-500" 
        >
            註冊
        </Link>
      </nav>
    </header>
  )
}
