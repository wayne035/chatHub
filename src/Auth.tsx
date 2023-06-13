import {Outlet} from 'react-router-dom'
import Home from './pages/Home.tsx'

export default function Auth() {
  return  localStorage.getItem('chatHubtoken') ? <Outlet/> : <Home/>
}
