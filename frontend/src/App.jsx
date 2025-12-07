import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import useGetCurrent from './Hooks/useGetCurrent'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import useGetOthersUser from './Hooks/getOthersUser'
import { useEffect } from 'react'
import { io } from "socket.io-client"
import { setOnlineUsers, setSocket } from './redux/userSlice'
import Forgot from './pages/Forgot'

export const serverUrl = "http://localhost:2000"

const App = () => {
  useGetCurrent()
  useGetOthersUser()

  const dispatch = useDispatch()
  const { userData, socket, onlineUsers } = useSelector(state => state.user)

  // ✅ Always call useEffect at top level
  useEffect(() => {
    // If user logged in → create socket
    if (userData) {
      const socketio = io(serverUrl, {
        query: {
          userId: userData._id,
        },
      })

      dispatch(setSocket(socketio))

      socketio.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users))
      })


      return () => socketio.close()
    }

    // If user logged out → close existing socket
    if (socket) {
      socket.close()
      dispatch(setSocket(null))
    }
  }, [userData])

  return (
    <Routes>
      <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/profile" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/signup" />} />
      <Route path='/forgot' element={userData ? <Navigate to="/" /> : <Forgot />} />
    </Routes>
  )
}

export default App
