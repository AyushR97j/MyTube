import React, { useEffect } from 'react'

const VideoContainer = () => {

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const YOUTUBE_VIDEOS_API = process.env.REACT_APP_YOUTUBE_VIDEOS_API+GOOGLE_API_KEY

  useEffect( () => {
      getVideos();
  });

  const getVideos = async () => {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();
      console.log(json);
  }

  return (
    <div>
      VideoContainer
    </div>
  )
}

export default VideoContainer
