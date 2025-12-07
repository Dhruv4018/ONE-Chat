import axios from 'axios';
import React, { useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
const Forgot = () => {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSendOtp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true })
            console.log(result);
            setLoading(false)
            setStep(2)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const handleVerifyOtp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify`, { email, otp }, { withCredentials: true })
            console.log(result);
            setLoading(false)
            setStep(3)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const handleResetPassword = async () => {
        setLoading(true)
        if (newPassword !== confirmPassword) {
           
            setLoading(false);
            return;
        }
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true })
            console.log(result);
            setLoading(false)
            navigate("/login")

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-slate-200'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4 mb-4'>
                    <IoArrowBackSharp size={30} className='text-blue-500 cursor-pointer' onClick={() => navigate("/login")} />

                    <h1 className='text-2xl font-bold text-center text-blue-500'>Forgot Password</h1>
                </div >
                {step == 1 && <div className='mb-6 '>
                    <label htmlFor="otp" className='block text-gray-700 font-medium text-[20px] mb-1'>Email</label>
                    <div className='flex flex-col justify-center items-center'>
                        <input type="email" placeholder='Email' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] p-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg'
                            onChange={(e) => setEmail(e.target.value)} value={email} />


                        <button className='px-[20px] py-[10px] mt-[20px]  cursor-pointer shadow-gray-400 shadow-lg bg-[#20c7ff] text-white font-semibold rounded-2xl text-[20px] w-[200px]'
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Send Otp"}
                        </button>
                    </div>
                </div>}

                {step == 2 && <div className='mb-6 '>
                    <label htmlFor="email" className='block text-gray-700 font-medium text-[20px] mb-1'>OTP</label>
                    <div className='flex flex-col justify-center items-center'>
                        <input type="text" placeholder='OTP' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] p-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg'
                            onChange={(e) => setOtp(e.target.value)} value={otp} />


                        <button className='px-[20px] py-[10px] mt-[20px]  cursor-pointer shadow-gray-400 shadow-lg bg-[#20c7ff] text-white font-semibold rounded-2xl text-[20px] w-[200px]'
                            onClick={handleVerifyOtp}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Verify"}
                        </button>
                    </div>
                </div>}


                {step == 3 && <div className='mb-6  '>

                    <label className='block text-gray-700 font-medium text-[20px] mb-1'>New Password</label>
                    <div className='flex flex-col justify-center items-center '>
                        <input type="text" placeholder='New Password' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] p-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg'
                            onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                    </div>

                    <br />


                    <label className='block text-gray-700 font-medium text-[20px] mb-1' >Confirm Password</label>
                    <div className='flex flex-col justify-center items-center gap-[20px]'>


                        <input type="text" placeholder='Confirm Password' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] p-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg'
                            onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />


                        <button className='px-[20px] py-[10px] mt-[20px]  cursor-pointer shadow-gray-400 shadow-lg bg-[#20c7ff] text-white font-semibold rounded-2xl text-[20px] w-[200px]'
                            onClick={handleResetPassword}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Reset Password"}
                        </button>
                    </div>


                </div>}
            </div>
        </div>
    )
}

export default Forgot