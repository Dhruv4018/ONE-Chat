import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const useGetCurrent = () => {
    let dispatch = useDispatch()
    let { userData } = useSelector(state => state.user)

    useEffect(() => {
        async function fetchUser() {
            try {
                let result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })

                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser();
    }, []); 

}

export default useGetCurrent