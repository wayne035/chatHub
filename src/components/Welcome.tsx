import {useSelf} from '../store/selfStore'
import Logout from '../components/Logout'

export default function Welcome() {
  const self = useSelf(s=>s.self);
  
  return (
    <div className='flex justify-between p-2 text-[22px] font-black items-center bg-black '>
      <div className='flex'>
        <div className='pr-2 text-white'>
          歡迎回來!
        </div>  
        <div className='text-[#6dc9ff]'>
          {self['name']}
        </div>
      </div>
      <div className='sm:hidden'><Logout/></div>
    </div>
  )
}
