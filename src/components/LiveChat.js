import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import {addMessage} from "../utils/chatSlice"
import { generateRandomName, makeRandomMessage } from '../utils/helper'

const LiveChat = () => {
  
  const [liveMessage, setLiveMessage] = useState("");

  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  const theme = useSelector((store) => store.app.theme);

    useEffect(() => {
        const i = setInterval(() => {

            dispatch(addMessage({
              name: generateRandomName() + " " + generateRandomName(),
              message: makeRandomMessage(20)
            }))

        }, 500);

        return () => clearInterval(i);
    },[])

  return (
    <>
    <div className={`w-full h-[412px] ml-2 p-2 border border-black rounded-lg bg-slate-100 overflow-y-scroll flex flex-col-reverse ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
        <div>
        {chatMessages.map( (c,i) => <ChatMessage 
        key={i}
        name={c.name} 
        message={c.message} />
        )}
        </div>
        
    </div>

    <form className="w-full p-2 ml-2 border border-black rounded-lg"
    onSubmit={(e) => {
      e.preventDefault();
      dispatch(
        addMessage({
          name: "Ayush Raj",
          message: liveMessage,
        })
      );
      setLiveMessage("");
    }}
    >
      <input 
        className={`px-2 w-96 rounded-full ${theme === 'dark' ? ' text-black' : ''}`}
        placeholder='Chat with Live Audience...'
        type="text" 
        value={liveMessage} 
        onChange={(e) => {setLiveMessage(e.target.value);
        }}
      />
      <button className='px-2 mx-auto ml-8 bg-green-200'>Send</button>   
    </form>
    </>
  )
}

export default LiveChat
