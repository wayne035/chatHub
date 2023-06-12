import {useSelf} from '../store/selfStore'
import Logout from '../components/Logout'

export default function Welcome() {
  const self = useSelf(s=>s.self);
  
  return (
    <div className='flex justify-between p-2 text-[24px] md:text-[30px] font-black items-center bg-black h-[10vh] md:justify-center md:bg-[#4b4bd4]'>
      <div className='flex'>
        <div className='pr-2 text-white'>
          歡迎回來!
        </div>  
        <div className='text-[#6dc9ff] md:text-[#defbff]'>
          {self['name']}
        </div>
      </div>
      <div className='md:hidden'><Logout/></div>
    </div>
  )
}
