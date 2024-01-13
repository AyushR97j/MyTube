import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';
import VideoDetail from './VideoDetail';
import RelatedVideos from './RelatedVideos';

const WatchPage = () => {

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu())
    },[])

  return (
    <div className='flex-col w-full'>
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
        <LiveChat />
      </div>
    </div>
    <div className='flex'>
      <div>
        <VideoDetail videoId={searchParams.get("v")} />
      <CommentsContainer />
      </div>
      <RelatedVideos />
    </div>
    
    
    </div>
  )
}

export default WatchPage
