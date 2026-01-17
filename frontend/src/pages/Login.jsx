import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { serverUrl } from "../App"
import { useDispatch } from 'react-redux'
import { setSelectUser, setUserData } from '../redux/userSlice'
const Login = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const result = await axios.post(`${serverUrl}/api/auth/login`, {
                email, password
            }, { withCredentials: true })

            dispatch(setUserData(result.data))
            dispatch(setSelectUser(null))
            navigate("/")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error.response.data.message)
        }

    }
    return (
        <div className='w-full h-[100vh] bg-slate-200  flex items-center justify-center'>
            <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
                <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
                    <h1 className='text-gray-600 font-bold text-[30px]'>Welcome to <span className='text-white'>Chatly</span></h1>

                </div>
                <form className='w-full flex flex-col gap-[20px] justify-center items-center' onSubmit={handleLogin} >

                    <input type="email" placeholder='Email' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[10px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg'
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                    <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
                        <input type={`${show ? "text" : "password"}`} placeholder='Password' className='w-full h-full outline-none  px-[10px] py-[10px] bg-white  '
                            onChange={(e) => setPassword(e.target.value)} value={password}
                        />
                        <span className='absolute top-[10px] right-[20px] text-[#20c7ff] font-semibold  cursor-pointer' onClick={() => setShow(prev => !prev)}>{`${show ? "hidden" : "show"}`}</span>
                    </div>
                    {/* <div className='w-[95%] text-right  mb-4 cursor-pointer font-medium text-blue-500' onClick={() => navigate("/forgot")}>
                        Forgot Password
                    </div> */}

                    {err && <p className='text-red-600'>*{err}</p>}
                    <button className='px-[20px] py-[10px] cursor-pointer shadow-gray-400 shadow-lg bg-[#20c7ff] text-white font-semibold rounded-2xl text-[20px] w-[200px]'
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}

                    </button>
                    <p> Want to create a new Account ? <span onClick={() => navigate("/signup")} className='cursor-pointer text-[#20c7ff] font-semibold'>Signup</span></p>
                </form>
            </div>



        </div>
    )
}


export default Login
