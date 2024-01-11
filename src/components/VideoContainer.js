import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import ShimmerVideoCard from './ShimmerVideoCard';

const VideoContainer = () => {

  const [loading, setLoading] = useState(true);
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const YOUTUBE_VIDEOS_API = process.env.REACT_APP_YOUTUBE_VIDEOS_API+GOOGLE_API_KEY

  const [videos, setVideos] = useState([]);

  useEffect( () => {
      getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();
      setVideos(json.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(true);
    }
  }

  return (
    <div className='flex flex-wrap items-start gap-2'>
    {loading ? Array(24)
                  .fill("")
                  .map((e, index) => {
                    return <ShimmerVideoCard key={index} />;
                  }) : (
      videos?.map( (video) => ( 
        <Link className='flex-shrink' key={video.id} to={"/watch?v="+video.id} >
          <VideoCard info={video}/>
        </Link>
      ))
    )}
    </div>
  )
};

export default VideoContainer
