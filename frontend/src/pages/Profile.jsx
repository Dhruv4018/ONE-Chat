import React from 'react'
import dp from "../assets/empty.webp"
import { useDispatch, useSelector } from 'react-redux'
import { IoCameraOutline } from "react-icons/io5"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useRef } from 'react'
import axios from "axios"
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
const Profile = () => {









  let { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  let dispatch = useDispatch()
  let [name, setName] = useState(userData.name || "")
  let [frontendImage, setFrontendImage] = useState(userData.image || dp)
  let [backendImage, setBackendImage] = useState(null)
  let [saving, setSaving] = useState(false)
  let image = useRef()

  const handleImage = async (e) => {
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleProfile = async (e) => {
    setSaving(true)
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("name", name)
      if (backendImage) {
        formData.append("image", backendImage)
      }

      let result = await axios.put(`${serverUrl}/api/user/edit-profile`, formData, { withCredentials: true })
      setSaving(false)
      
      dispatch(setUserData(result.data))
      navigate("/")
      
    } catch (error) {
      setSaving(false)
      console.log(error);


    }
  }


  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
      <div className='fixed top-[20px] left-[20px] '>
        <IoIosArrowRoundBack className='w-[50px] h-[50px] text-[#20c7ff] cursor-pointer' onClick={() => navigate("/")} />
      </div>
      <div className=' bg-white rounded-full border-5 border-[#20c7ff] shadow-gray-900 shadow-lg  relative cursor-pointer' onClick={() => image.current.click()}>
        <div className='w-[200px] h-[200px] overflow-hidden  rounded-full flex justify-center items-center'>
          <img src={frontendImage} alt="" className='h-[100%]  w-full' />

        </div>
        <div className='absolute bottom-8 right-0 w-[35px] h-[35px] text-gray-700 rounded-full bg-[#20c7ff] flex justify-center items-center'>
          <IoCameraOutline className=' w-[25px] h-[25px] text-gray-700 ' />
        </div>
        

      </div>

      <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center' onSubmit={handleProfile}>

        <input type="file" accept='image/*' hidden ref={image} onChange={handleImage} />
        <input type="text" placeholder='Enter Your name' onChange={(e) => setName(e.target.value)} value={name}
          className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-500 shadow-lg text-gray-700 text-[19px] '
        />
        <input type="text" readOnly value={userData.userName} className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-500 shadow-lg text-gray-400 text-[19px] ' />
        <input type="email" readOnly value={userData.email} className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-500 shadow-lg text-gray-400 text-[19px] ' />
        <button className='px-[20px] py-[10px] cursor-pointer shadow-gray-400 shadow-lg bg-[#20c7ff] text-white font-semibold rounded-2xl text-[20px] w-[200px]' disabled={saving}>{saving ? "saving..." : "Save Profile"}</button>
      </form>


    </div>
  )
}

export default Profile