import {Routes,Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Chat/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='*' element={<Chat/>}/>
    </Routes>
  )
}
