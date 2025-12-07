import React from 'react'
import SideBar from '../components/SideBar'
import Message from '../components/Message'
import useGetMessage from '../Hooks/useGetMessage'

const Home = () => {
  
  useGetMessage()
  return (
    <div className='flex w-full h-[100vh] overflow-hidden'>
      <SideBar/>
      <Message/>
    </div>
  )
}

export default Home