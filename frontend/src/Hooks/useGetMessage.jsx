import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setMessageData } from '../redux/messageSlice'

const useGetMessage = () => {
  const dispatch = useDispatch()
  const { userData, selectUser } = useSelector(state => state.user)

  useEffect(() => {
    if (!selectUser) return // ← guard: don't fetch if no selected user

    async function fetchMessage() {
      try {
        const result = await axios.get(`${serverUrl}/api/message/get/${selectUser._id}`, { withCredentials: true })
        dispatch(setMessageData(result.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchMessage()
  }, [selectUser, userData, dispatch])
}

export default useGetMessage
