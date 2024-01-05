import {useEffect, useState} from 'react'

const VideoDetail = ({videoId}) => {

    const[videoDetails, setVideoDetails] = useState({});

    useEffect( () => {
        getVideoDetails();
    }, []);

    const getVideoDetails = async () => {
        const data = await fetch(`${process.env.REACT_APP_VIDEO_DETAIL_API_PART1}${videoId}${process.env.REACT_APP_VIDEO_DETAIL_API_PART2}${process.env.REACT_APP_GOOGLE_API_KEY}`);
        const json = await data.json();
        console.log("VIDEO DATA2 :", json.items[0].snippet.title);
        
        const updatedVideoDetails = {
            "title": json.items[0].snippet.title,
            // "channelLogo":
            "channelName": json.items[0].snippet.channelTitle,
            "description": json.items[0].snippet.description,
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
    <div className=' ml-10 w-[900px] mt-[-30px]'>
        <span className="font-bold text-xl">
            {videoDetails?.title}
        </span>
        <div className='flex flex-col gap-3 rounded-xl mt-4 px-3 py-3 bg-gray-200'>
            <div>
                <span className="font-semibold">
                    {videoDetails?.channelName}
                </span>
                <span className="ml-80">
                    {videoDetails?.likeCount} Likes
                </span>
            </div>
            <div className='flex gap-4'>
                <span>
                    {videoDetails?.viewCount} views
                </span>
                <span>
                    {videoDetails?.publishedAt?.slice(0,10)
                        ? new Date(videoDetails.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
                        : "No Date Available"}
                </span>
            </div>
            <span>
                {videoDetails?.description}
            </span>
        
        </div>
        
    </div>
  )
}

export default VideoDetail
