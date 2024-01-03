import React from 'react'
import userIcon from "../assets/images/userIcon.png";

const ChatMessage = ({ name, message }) => {
  return (
    <div className='flex items-center shadow-sm p-2'>
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
