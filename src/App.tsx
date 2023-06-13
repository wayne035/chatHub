import {Suspense,lazy} from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Loading from './components/Loading'
import Auth from './Auth'
import Register from './pages/Register'
import Login from './pages/Login'
const Chat = lazy(()=> import('./pages/Chat'))

export default function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<Auth/>}>
          <Route path='/chat' element={<Chat/>}/>
        </Route>
        <Route path='*' element={<Home/>}/>
      </Routes>
    </Suspense>
  )
}
