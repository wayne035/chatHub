import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className='flex justify-between bg-[#000] h-[60px] text-[#fff] fixed w-full'>
      <h1 className='leading-[60px] text-[30px] pl-[15px] cursor-default flex font-black'>
        Chat 
        <div className='leading-[44px] text-[30px] px-[3px] my-[8px] mx-[5px] cursor-default bg-[#0080FF] rounded-[10px] text-center'>
          Hub
        </div>
      </h1>
      <nav className="h-full flex">
        <Link to='/chat' 
                className="h-full leading-[60px] text-[22px] md:text-[26px] font-black px-[8px] md:px-[25px] hover:bg-[#0080FF] hover:text-[#ccc] duration-700" 
        >
            聊天去
        </Link>
        <Link to='/login' 
                className="h-full leading-[60px] text-[22px] md:text-[26px] font-black px-[8px] md:px-[25px] hover:bg-[#0080FF] hover:text-[#ccc] duration-700" 
        >
            登入
        </Link>
        <Link to='/register' 
                className="h-full leading-[60px] text-[22px] md:text-[26px] font-black px-[8px] md:px-[25px] hover:bg-[#0080FF] hover:text-[#ccc] duration-700" 
        >
            註冊
        </Link>
      </nav>
    </header>
  )
}
