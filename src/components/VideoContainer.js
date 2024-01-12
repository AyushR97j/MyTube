import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import ShimmerVideoCard from './ShimmerVideoCard';

const VideoContainer = ({page}) => {

  const [loading, setLoading] = useState(true);
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  
  const YOUTUBE_VIDEOS_API =
  page === "feed"
    ? `${process.env.REACT_APP_YOUTUBE_VIDEOS_API}${GOOGLE_API_KEY}`
    : `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${page}&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

  const [videos, setVideos] = useState([]);

  useEffect( () => {
      getVideos();
  }, [page]);

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
    <div className='flex flex-wrap items-start gap-2 justify-center -ml-2'>
    {loading ? Array(24)
                  .fill("")
                  .map((e, index) => {
                    return <ShimmerVideoCard key={index} />;
                  }) : (
      videos?.map( (video, index) => ( 
        <Link className='flex-shrink' key={index} to={"/watch?v="+video.id} >
          <VideoCard info={video}/>
        </Link>
      ))
    )}
    </div>
  )
};

export default VideoContainer
