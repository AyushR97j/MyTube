import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';
import VideoDetail from './VideoDetail';
import RelatedVideos from './RelatedVideos';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";


const WatchPage = () => {

    const [showLiveChat, setShowLiveChat] = useState(false);
    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu())
    },[])

    const handleShowLiveChat = () => {
      setShowLiveChat(!showLiveChat);
    };

  return (
    <div className='flex-col w-full cursor-pointer'>
    <div className='px-10 flex w-full '>
      <div>
        <iframe 
          width="900" 
          height="506" 
          src={"https://www.youtube.com/embed/"+searchParams.get("v")}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen>
        </iframe>
      </div>
      <div className='w-full'>
      {!showLiveChat ? (
        <div className='h-4 px-auto text-center flex justify-center items-center mt-3 bg-gray-200 py-5 rounded-3xl hover:bg-gray-300' onClick={handleShowLiveChat}>
          <div className='flex justify-start items-center'>
            <div className='font-medium'>
              <div className='flex justify-center items-center gap-1'>
                <IoIosArrowDropdown /> Show LiveChat
              </div>
              </div>
              <div className='font-small ml-1'>(Nevermind! Just some Random Section)
            </div>
          </div>
        </div>
      ) : (
        <>
          <LiveChat />
          <div className='cursor-pointer h-4 px-auto text-center flex justify-center items-center mt-3 bg-gray-200 py-5 rounded-3xl hover:bg-gray-300' onClick={handleShowLiveChat}>
          <div className='flex justify-start items-center'>
            <div className='font-medium'>
              <div className='flex justify-center items-center gap-1'>
                <IoIosArrowDropup /> Hide LiveChat
              </div>
              </div>
              <div className='font-small ml-1'>(Nevermind! Just some Random Section)
            </div>
          </div>
        </div>
        </>
        
      )}
      </div>
    </div>
    <div className='flex'>
      <div>
        <VideoDetail videoId={searchParams.get("v")} />
      <CommentsContainer />
      </div>
      <div className={showLiveChat ? "" : "-mt-[469px]"}>
        <RelatedVideos />
      </div>
      
    </div>
    
    
    </div>
  )
}

export default WatchPage
