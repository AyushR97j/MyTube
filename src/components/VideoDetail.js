import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

const VideoDetail = ({videoId}) => {

    const[videoDetails, setVideoDetails] = useState({});
    const [showFullContent, setShowFullContent] = useState(false);
    const[text, setText] = useState("...read more");
    const theme = useSelector((store) => store.app.theme);

    useEffect( () => {
        getVideoDetails();
        console.log("videoId",videoId)
    }, [videoId]);

    const handleReadMoreClick = () => {
        setShowFullContent(!showFullContent);
        if(showFullContent){
            setText("...show more")
        }
        else{
            setText("...show less")
        }

      };

    async function getChannelDetails(channelId) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet,statistics&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch channel details');
            }
    
            const data = await response.json();
            const channelDetails = {
                logoUrl: data.items[0]?.snippet?.thumbnails?.default?.url,
                subscriberCount: data.items[0]?.statistics?.subscriberCount
            };
    
            return channelDetails;
        } catch (error) {
            console.error('Error:', error.message);
            // Handle the error or return default values
            return null;
        }
    }

    const getVideoDetails = async () => {
        const data = await fetch(`${process.env.REACT_APP_VIDEO_DETAIL_API_PART1}${videoId}${process.env.REACT_APP_VIDEO_DETAIL_API_PART2}${process.env.REACT_APP_GOOGLE_API_KEY}`);
        const json = await data.json();
        //console.log("video data",json)
        //console.log(json.items[0].snippet.channelId);
        const channelDetails = await getChannelDetails(json.items[0].snippet.channelId)
        // console.log(channelDetails);
        const trimmedDescription = json.items[0].snippet.description.slice(0, 140);
        
        const updatedVideoDetails = {
            "title": json.items[0].snippet.title,
            "channelLogo":  channelDetails.logoUrl,
            "subscriberCount": channelDetails.subscriberCount,
            "channelName": json.items[0].snippet.channelTitle,
            "description": json.items[0].snippet.description,
            "trimmedDescription": trimmedDescription,
            "viewCount": json.items[0].statistics.viewCount,
            "publishedAt": json.items[0].snippet.publishedAt,
            "likeCount": json.items[0].statistics.likeCount,
        }
        
        setVideoDetails( videoDetails => ({
            ...videoDetails,
            ...updatedVideoDetails,
        }));
    }
  
    return (
    <div className='ml-10 w-[900px] mt-4'>
        <span className="font-bold text-xl">
            {videoDetails?.title}
        </span>
        <div className='flex mt-3'>
                <span>
                    <img src={videoDetails?.logoUrl} alt="O" />
                </span>
                <span className="flex flex-col">
                    <span className='font-semibold'>{videoDetails?.channelName}</span>
                    <span>{Math.floor(videoDetails?.subscriberCount/1000)}K subscribers</span>
                </span>
                <span className={`ml-80 rounded-full bg-gray-100 mb-8 py-1 px-3 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
                    {Math.floor(videoDetails?.likeCount/1000)}K likes
                </span>
            </div>
        <div className={`flex flex-col gap-3 rounded-xl px-3 py-3 bg-gray-200 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
            <div className='flex gap-4'>
                <span>
                    {Math.floor(videoDetails?.viewCount/1000)}K views
                </span>
                <span>
                    {videoDetails?.publishedAt?.slice(0,10)
                        ? new Date(videoDetails.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
                        : "No Date Available"}
                </span>
            </div>
            <span>
                {showFullContent ? videoDetails?.description : videoDetails.trimmedDescription}
                <button className='text-cyan-800 font-semibold' onClick={handleReadMoreClick}> {text}</button>
            </span>
            
        
        </div>
        
    </div>
  )
}

export default VideoDetail
