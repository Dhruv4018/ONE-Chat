import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/empty.webp"
import axios from "axios"
import { serverUrl } from "../App"
import { RxCross2 } from 'react-icons/rx'
import { FaImages } from "react-icons/fa6"
import { IoIosArrowRoundBack } from 'react-icons/io'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { RiEmojiStickerLine } from "react-icons/ri"
import { setSelectUser } from '../redux/userSlice'
import { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import { setMessageData } from '../redux/messageSlice'
import { BiMessageSquare } from 'react-icons/bi'
const Message = () => {

  let dispatch = useDispatch()
  let { selectUser, userData, socket } = useSelector(state => state.user)
  let [showPicker, setShowPicker] = useState(false)
  let [input, setInput] = useState("")

  let [frontendImage, setFrontendImage] = useState(null)
  let [backendImage, setBackendImage] = useState(null)
  let image = useRef()
  let { messages } = useSelector(state => state.message)

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (input.length == 0 && backendImage == null) {
      return
    }

    try {
      let formData = new FormData()
      formData.append("message", input)
      if (backendImage) {
        formData.append("image", backendImage)
      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectUser._id}`, formData, { withCredentials: true })
      dispatch(setMessageData([...messages, result.data]))
      setInput("")
      setFrontendImage("")
      setBackendImage(null)


    } catch (error) {
      console.log(error);
    }
  }
  const handleImage = (e) => {
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  const onEmojiClick = (emojiData) => {
    setInput(prevInput => prevInput + emojiData.emoji)
    setShowPicker(false)
  }

  // Add this function inside Message component
const handleDeleteMessage = async (id) => {
  try {
    await axios.delete(`${serverUrl}/api/message/delete/${id}`, { withCredentials: true });
    // Remove deleted message from Redux state
    dispatch(setMessageData(messages.filter(m => m._id !== id)));
  } catch (error) {
    console.log("Delete message error:", error);
  }
};


  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setMessageData([...messages, mess]))
    })
     socket.on("deleteMessage", (id) => {
    dispatch(setMessageData(messages.filter(m => m._id !== id)));
  });
    return () => socket.off()
  }, [messages, setMessageData])




  return (
    <div className={`lg:w-[70%] ${selectUser ? "flex" : "hidden"} lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300 relative`}>
      {selectUser &&
        <div className='w-full h-[100vh] flex flex-col'>

          <div className='w-full h-[100px] bg-[#5cafcb] rounded-b-[30px] shadow-gray-400 shadow-lg flex gap-[20px]  items-center px-[20px]'>
            <div className='cursor-pointer ' onClick={() => dispatch(setSelectUser(null))}>
              <IoIosArrowRoundBack className='w-[40px] h-[40px] text-[#fefefe] cursor-pointer' />
            </div>
            <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer' >
              <img src={selectUser?.image || dp} className='w-full h-full' />
            </div>
            <h1 className='text-white font-semibold text-[20px]'>{selectUser?.name || "user"}</h1>


          </div>

          <div className='w-full h-[70%] flex flex-col py-[30px] px-[20px] overflow-auto  gap-[20px]'>
            {showPicker &&
              <div className="absolute bottom-[110px] left-[20px]">
                <EmojiPicker width={250} height={350} className='shadow-lg' onEmojiClick={onEmojiClick} />

              </div>
            }
           {messages && messages.map((mess) => (
  mess.sender === userData._id
    ? <SenderMessage 
        key={mess._id} 
        id={mess._id}          // Pass the message id
        image={mess.image} 
        message={mess.message} 
        onDelete={(id) => handleDeleteMessage(id)}  // Or pass directly
      /> 
    : <ReceiverMessage 
        key={mess._id} 
        id={mess._id}          // Also pass id
        image={mess.image} 
        message={mess.message} 
      />
))}

          </div>
        </div>

      }

      {!selectUser &&
        <div className='w-full h-full flex  bg-[#f6fafa] flex-col justify-center items-center'>
          <h1 className='text-[#20c7ff] font-bold text-[50px]'>Welcome to {userData.name}</h1>
          <span className='text-[#20c7ff] font-semibold text-[45px]'>Continue Chat !</span>
        </div>
      }

      {selectUser && <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex justify-center items-center  '>
        <img src={frontendImage} alt="" className='w-[80px] absolute bottom-[100px] right-[20%] rounded-lg shadow-gray-400 shadow-lg' />
        <form className='w-[95%] lg:w-[70%] h-[60px] bg-[rgb(23,151,194)] rounded-full shadow-gray-400 shadow-lg  flex items-center gap-[20px] px-[20px] ' onSubmit={handleSendMessage}>


          <div onClick={() => setShowPicker(prev => !prev)}>
            <RiEmojiStickerLine className='w-[25px] h-[25px] text-white cursor-pointer' />
          </div>
          <input type="file" hidden ref={image} accept='image/*' onChange={handleImage} />
          <input type="text" className='w-full h-full px-[10px] outline-none border-0 text-[19px] text-white bg-transparent placeholder-white' placeholder='Message...' onChange={(e) => setInput(e.target.value)} value={input} />
          <div onClick={() => image.current.click()}>
            <FaImages className='w-[25px] h-[25px] text-white cursor-pointer' />
          </div>
          {(input.length !== 0 || backendImage) && (
            <button type="submit">
              <RiSendPlane2Fill className='w-[25px] h-[25px] text-white cursor-pointer' />
            </button>
          )}


        </form>
      </div>}



    </div>

  )
}

export default Message