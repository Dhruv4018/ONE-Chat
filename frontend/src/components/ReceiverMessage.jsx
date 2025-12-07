import React, { useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';

const ReceiverMessage = ({ image, message }) => {
    let scroll = useRef();
    let { selectUser } = useSelector(state => state.user);

    useEffect(() => {
        scroll?.current.scrollIntoView({ behavior: "smooth" });
    }, [message, image]);

    const handleScroll = () => {
        scroll?.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className='flex items-start gap-[10px] w-full'>
           
            <div className='w-[40px] h-[40px] rounded-full overflow-hidden shadow-lg flex justify-center items-center'>
                <img src={selectUser?.image} className='w-full h-full object-cover' />
            </div>

            
            <div ref={scroll} className='relative group w-fit max-w-[500px] px-[20px] py-[10px] 
                bg-[#20c7ff] text-white text-[19px] rounded-tl-none rounded-2xl 
                shadow-lg gap-[10px] flex flex-col'>
                {image && <img src={image} className='max-w-[150px] max-h-[150px] object-cover rounded-lg' onLoad={handleScroll} />}
                {message && <span>{message}</span>}
            </div>
        </div>
    )
}

export default ReceiverMessage;
