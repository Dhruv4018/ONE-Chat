import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
const SignUp = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [userName, setuserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                userName, email, password
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            navigate("/profile")
            setuserName("")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")
        } catch (error) {
            console.log(error);
            setLoading(false)
            setErr(error?.response?.data?.message)

        }

    }


    return (
        <div className='w-full h-[100vh] bg-slate-200  flex items-center justify-center'>
            <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
                <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
                    <h1 className='text-gray-600 font-bold text-[30px]'>Welcome to <span className='text-white'>Chatly</span></h1>

                </div>
                <form className='w-full flex flex-col gap-[20px] justify-center items-center' onSubmit={handleSignup}>
                    <input type="text" placeholder='UserName' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[10px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg' onChange={(e) => setuserName(e.target.value)} value={userName} />
                    <input type="email" placeholder='Email' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[10px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
                        <input type={`${show ? "text" : "password"}`} placeholder='Password' className='w-full h-full outline-none  px-[10px] py-[10px] bg-white  ' onChange={(e) => setPassword(e.target.value)} value={password} />
                        <span className='absolute top-[10px] right-[20px] text-[#20c7ff] font-semibold  cursor-pointer' onClick={() => setShow(prev => !prev)}>{`${show ? "hidden" : "show"}`}</span>
                    </div>
                    {err && <p className='text-red-600'>{err}</p>}
                    <button className='px-[20px] py-[10px] cursor-pointer shadow-gray-400 shadow-lg bg-[#20c7ff] text-white font-semibold rounded-2xl text-[20px] w-[200px]' disabled={loading}>
                        {loading ? "Loading.." : "sign up"}

                    </button>
                    <p>Already Have An Account ? <span onClick={() => navigate("/login")} className='cursor-pointer text-[#20c7ff] font-semibold'>Login</span></p>
                </form>
            </div>



        </div>
    )
}

export default SignUp