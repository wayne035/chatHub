import {Suspense,lazy} from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Loading from './components/Loading'
const Register = lazy(()=> import('./pages/Register'))
const Login = lazy(()=> import('./pages/Login'))
const Chat = lazy(()=> import('./pages/Chat'))

export default function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<Home/>}/>
      </Routes>
    </Suspense>
  )
}
