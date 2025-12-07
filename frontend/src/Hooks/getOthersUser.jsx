import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setOtherUsers } from "../redux/userSlice";
import { serverUrl } from "../App";

const useGetOthersUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOthers = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/others`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(result.data));
       
      } catch (error) {
        console.log(error);
      }
    };

   fetchOthers();
  }, [userData]); 
};

export default useGetOthersUser;
