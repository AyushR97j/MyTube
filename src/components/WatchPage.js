import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import MockComments from './MockComments';
import LiveChat from './LiveChat';
import VideoDetail from './VideoDetail';
import RelatedVideos from './RelatedVideos';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import CommentsContainer from './CommentsContainer';


const WatchPage = () => {

    const [showLiveChat, setShowLiveChat] = useState(false);
    const [searchParams] = useSearchParams();
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    const theme = useSelector((store) => store.app.theme);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu());
        console.log("vis",searchParams.get("v"));

        return () => {
          dispatch(closeMenu())
        }
    },[]);

    const handleShowLiveChat = () => {
      setShowLiveChat(!showLiveChat);
    };

    const handleBlur = () => {
      if(isMenuOpen){
        dispatch(closeMenu());
      }
    }

  return (
    <div className={`flex-col w-full pl-8 ${isMenuOpen ? 'blur-sm z-0 overflow-hidden h-screen' : ''} ${theme === 'dark' ? 'bg-black text-white' : ''}`} onClick={handleBlur}>
    <div className='px-10 flex w-full '>
      <div>
        <iframe 
          width="920" 
          height="517" 
          src={"https://www.youtube.com/embed/"+searchParams.get("v")}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={`rounded-xl mt-3 ${isMenuOpen ? 'pointer-events-none' : ''}`}>
        </iframe>
      </div>
      <div className='w-full'>
      {!showLiveChat ? (
        <div className={`h-4 px-auto text-center flex justify-center items-center mt-3 mx-4 bg-gray-200 py-5 rounded-3xl cursor-pointer hover:bg-gray-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`} onClick={handleShowLiveChat}>
          <div className='flex justify-start items-center '>
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
          <div className={`cursor-pointer h-4 px-auto text-center mx-4 flex justify-center items-center mt-3 bg-gray-200 py-5 rounded-3xl hover:bg-gray-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`} onClick={handleShowLiveChat}>
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
    <div className='flex gap-2'>
      <div>
        <VideoDetail videoId={searchParams.get("v")} />
        <MockComments />
        <CommentsContainer videoId={searchParams.get("v")} />
      </div>
      <div className={showLiveChat ? "" : "-mt-[485px]"}>
        <RelatedVideos />
      </div>
      
    </div>
    
    
    </div>
  )
}

export default WatchPage
