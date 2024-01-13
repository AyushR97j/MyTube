import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';

const RelatedVideos = () => {

    const [relatedVideos, setRelatedVideos] = useState(null);

    useEffect( () => {
        const url = new URLSearchParams(window.location.search);
        const videoId =  url.get('v');
        //console.log(videoId);
        const channelId =  getChannelId(videoId);
        getRelatedVideos(videoId);
    }, []);

    const getRelatedVideos = async(videoId) => {
        try {
            // const data = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
            // const json = await data.json();
            // console.log("hy",json);
            const channelId =  await getChannelId(videoId);

            const data = await fetch(`https://www.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&maxResults=50&regionCode=in&key=${process.env.REACT_APP_GOOGLE_API_KEY}&channelId=${channelId}`);
            const json = await data.json();
            setRelatedVideos(json.items)

        } catch(error) {
            console.log('Error fetching data from the YouTube API:', error);
        }
    }

    async function getChannelId(videoId, apiKey) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
            if (!response.ok) {
                throw new Error('Failed to fetch video details');
            }
            const data = await response.json();
            const channelId = data.items[0]?.snippet?.channelId;
            return channelId;
        } catch (error) {
            console.log('Error:', error.message);
            // Handle the error or return a default value
            return null;
        }
    }

  return (
    <div className='w-full ml-3 mt-4 rounded-lg overflow'>
    {relatedVideos?.map((video, index) => (
        <Link 
            className='flex-shrink' 
            key={index} 
            to={`/watch?v=${video?.contentDetails?.upload?.videoId}`}
        >
            <VideoCard info={video} />
        </Link>
    ))}
    </div>

  )
}

export default RelatedVideos;
