import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/empty.webp"
import { IoIosSearch } from 'react-icons/io'
import { RxCross2 } from "react-icons/rx"
import { BiLogOutCircle } from "react-icons/bi"
import axios from 'axios'
import { serverUrl } from '../App'
import { setOtherUsers, setSearchData, setSelectUser, setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
const SideBar = () => {
  let { userData, otherUsers, selectUser, onlineUsers, searchData } = useSelector(state => state.user)
  let [search, setSearch] = useState(false)
  let dispatch = useDispatch()
  let [input, setInput] = useState("")
  let navigate = useNavigate()
  const handleLogOut = async () => {
    try {
      let result = axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
      dispatch(setOtherUsers(null))
      navigate("/login")
    } catch (error) {
      console.log(error);

    }
  }

  const handleSearch = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true })
      dispatch(setSearchData(result.data))

      // setInput("")
    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    if (input.length > 0) {
      handleSearch()
    }

  }, [input])


  return (
    <div className={`lg:w-[30%] w-full h-full lg:block relative ${!selectUser ? "block" : "hidden"} bg-slate-200 overflow-hidden`}>
      <div className='w-[60px] h-[60px] rounded-full overflow-hidden mt-[10px] flex bg-[#20c7ff] justify-center items-center  cursor-pointer fixed bottom-[20px] left-[20px] shadow-gray-500 shadow-lg ' onClick={handleLogOut} >
        <BiLogOutCircle className='w-[25px] h-[25px] text-red-600 ' />
      </div>
      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%]  shadow-gray-400 shadow-lg flex flex-col  justify-center px-[20px]'>
        {input.length > 0 && <div className='flex  w-full  h-[300px] top-[240px] overflow-y-auto flex-col items-start pt-[20px] gap-[10px] bg-white absolute z-[150] shadow-lg '>
          {searchData?.map((user) => (
            <div className='w-[94%] h-[70px] flex  items-center  gap-[20px] bg-white px-[10px]   p-[30px] cursor-pointer hover:bg-[#b2ccdf] border-b-2 border-gray-500'
              onClick={() => {
                dispatch(setSelectUser(user))

                setInput("")
                setSearch(false)
              }

              }
            >
              <div className='relative rounded-full  flex justify-center items-center  '>
                <div className='w-[50px] h-[50px]   rounded-full overflow-hidden flex justify-center items-center '>
                  <img src={user.image || dp} className='w-full h-full' />

                </div>
                {onlineUsers?.includes(user._id) &&
                  <span className='w-[10px] h-[10px] mt-[50px] right-2 bottom-[1px] rounded-full absolute bg-[#3aff20]'></span>}
              </div>
              <h1 className='text-gray-800 font-semibold text-[20px] '>{user.name || user.userName}</h1>
            </div>
          ))}
        </div>}

        <h1 className='text-white font-bold text-[29px]'>Chatly</h1>
        <div className='w-full flex justify-between items-center'>
          <h1 className='text-gray-800 font-semibold text-[29px]'>Hi , {userData.name || "user"}</h1>
          <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer' onClick={() => navigate("/profile")}>
            <img src={userData.image || dp} className='w-full h-full' />
          </div>

        </div>
        <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[15px]'>
          {!search && <div className='w-[60px] h-[60px] rounded-full overflow-hidden mt-[10px] flex justify-center items-center cursor-pointer shadow-gray-500 shadow-lg bg-white' onClick={() => setSearch(true)}>
            <IoIosSearch className='w-[25px] h-[25px]' />
          </div>}




          {search &&
            <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px]' >
              <IoIosSearch className='w-[25px] h-[25px]' />
              <input type="text" placeholder='serach users....' className='w-full h-full text-[19px] outline-0 border-0' onChange={(e) => setInput(e.target.value)} value={input} />
              <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={() => { setSearch(false), setInput("") }} />


            </form>

          }
          {!search && otherUsers?.map((user) => (
            onlineUsers?.includes(user._id) &&
            <div className='relative rounded-full shadow-gray-500 shadow-lg flex justify-center items-center mt-[10px] cursor-pointer' onClick={() => dispatch(setSelectUser(user))}>
              <div className='w-[60px] h-[60px]   rounded-full overflow-hidden flex justify-center items-center '>
                <img src={user.image || dp} className='w-full h-full' />

              </div>
              <span className='w-[10px] h-[10px] mt-[50px] right-1 rounded-full absolute bg-[#3aff20]'></span>
            </div>
          ))}


        </div>
      </div>
      <div className='w-full h-[50%] overflow-auto flex flex-col gap-[20px] items-center mt-[10px] '>
        {otherUsers?.map((user) => (
          <div className='w-[95%] h-[60px] flex  items-center gap-[20px] bg-white shadow-gray-500 shadow-lg rounded-full p-[30px] cursor-pointer hover:bg-[#b2ccdf]'
            onClick={() => dispatch(setSelectUser(user))}
          >
            <div className='relative rounded-full shadow-gray-500 shadow-lg flex justify-center items-center  '>
              <div className='w-[50px] h-[50px]   rounded-full overflow-hidden flex justify-center items-center '>
                <img src={user.image || dp} className='w-full h-full' />

              </div>
              {onlineUsers?.includes(user._id) &&
                <span className='w-[10px] h-[10px] mt-[50px] right-2 bottom-[1px] rounded-full absolute bg-[#3aff20]'></span>}
            </div>
            <h1 className='text-gray-800 font-semibold text-[20px] '>{user.name || user.userName}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar