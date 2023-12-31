import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';

const VideoContainer = () => {

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const YOUTUBE_VIDEOS_API = process.env.REACT_APP_YOUTUBE_VIDEOS_API+GOOGLE_API_KEY

  const [videos, setVideos] = useState([]);

  useEffect( () => {
      getVideos();
  }, []);

  const getVideos = async () => {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();
      setVideos(json.items);
  }

  return (
    <div className='flex flex-wrap'>
    {videos.map( video => ( 
    < VideoCard key={video.id} info={video}/> 
    ))}
    </div>
  )
}

export default VideoContainer
