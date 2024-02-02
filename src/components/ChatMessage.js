import React from 'react'
import userIcon from "../assets/images/userIcon.png";
import { useDispatch, useSelector } from 'react-redux'


const ChatMessage = ({ name, message }) => {
  const theme = useSelector((store) => store.app.theme);

  return (
    <div className={`flex items-center shadow-sm p-2 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
        <img 
            className='h-8' 
            alt="comment-user-icon" 
            src={userIcon} 
        />
        <span className='font-bold px-2'>{name}</span>
        <span>{message}</span>
    </div>
  )
}

export default ChatMessage
