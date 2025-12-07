import React, { useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';

function SenderMessage({ id, image, message, onDelete }) {
    let { userData } = useSelector(state => state.user);

    const handleDelete = () => {
        if (onDelete) onDelete(id);
    };

    let scroll = useRef();

    useEffect(() => {
        scroll?.current.scrollIntoView({ behavior: "smooth" })
    }, [message, image]);

    const handleScroll = () => {
        scroll?.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className='flex items-start gap-[10px] w-full justify-end'>
            {/* Avatar */}
           
            {/* Message box */}
            <div ref={scroll} className='relative group w-fit max-w-[500px] px-[20px] py-[10px] 
                bg-[rgb(23,151,194)] text-white text-[19px] rounded-tr-none rounded-2xl 
                shadow-lg flex flex-col gap-[10px]'>

                {/* Delete button inside the message box */}
                <button
                    onClick={handleDelete}
                    className='hidden group-hover:block absolute top-[-4px] right-1 
                        bg-white text-black p-1 rounded-full shadow cursor-pointer z-10'
                >
                    <MdDelete size={20} />
                </button>

                {image && <img src={image} className='max-w-[150px] max-h-[150px] object-cover rounded-lg' onLoad={handleScroll} />}
                {message && <span>{message}</span>}
            </div>
             <div className='w-[40px] h-[40px] rounded-full overflow-hidden shadow-lg flex justify-center items-center'>
                <img src={userData.image} className='w-full h-full object-cover' />
            </div>

        </div>
    )
}

export default SenderMessage;
