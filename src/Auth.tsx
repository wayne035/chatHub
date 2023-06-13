import {Outlet} from 'react-router-dom'
import {useSelf} from './store/selfStore.ts'
import Home from './pages/Home.tsx'

export default function Auth() {
  const isLogin = useSelf(s=>s.isLogin);
  const cookieKey = (document.cookie).split("=")[0]

  return  isLogin || cookieKey ? <Outlet/> : <Home/>
}
