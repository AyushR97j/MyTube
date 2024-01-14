import React, { useEffect, useState } from 'react'
import { commentsTimeStamp } from '../utils/helper';
import { PiThumbsUpLight } from "react-icons/pi";
import { PiThumbsDownLight } from "react-icons/pi";


const Comment = ({data}) => {
    //console.log("data",data);
    const name = data?.snippet?.topLevelComment?.snippet?.authorDisplayName;
    //console.log("name",data?.snippet?.topLevelComment?.snippet?.authorDisplayName);
    const publishedAt = commentsTimeStamp(data)
    //console.log("pubAt",publishedAt);
    const likeCount = data?.snippet?.topLevelComment?.snippet?.likeCount;
    //console.log("likecount",data?.snippet?.topLevelComment?.snippet?.likeCount)
    const textOriginal = data?.snippet?.topLevelComment?.snippet?.textOriginal;
    console.log("text",data?.snippet?.topLevelComment?.snippet?.textOriginal)
    const authorProfileImageUrl = data?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl;
    //console.log("url",data?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl)
    
    return (
        <div className='flex my-4 gap-3'>
            <img className='bg-gray-200 flex h-10 w-10 rounded-full' src={authorProfileImageUrl}  alt="ProfileImg" />
            <div>
                <div className='flex gap-2'>
                    <div className='font-semibold'>{name}</div>
                    <div>{publishedAt}</div>
                </div>
                <div>{textOriginal}</div>
                <div className='flex gap-10'>
                    <div className='flex items-center gap-2'>
                        <div><PiThumbsUpLight /></div>
                        <div>{likeCount}</div>
                    </div>
                    <div className='flex items-center'>
                        <PiThumbsDownLight />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

const CommentList = ({comments}) => {
    return comments.map((comment, index) => (
        <div key={index}>
            <Comment data={comment} />
        </div>
    ))
}

const CommentsContainer = ({videoId}) => {

    const [comments, setCommets] = useState(null);

    const getComments = async() => {
        const data = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        const json = await data.json();
        console.log("json",json.items)
        setCommets(json.items)
        //console.log(json.items[0].snippet.topLevelComment.snippet.authorDisplayName)
    }

    useEffect( () => {
        getComments();
    },[])

  return (
    <div className='ml-8'>
    <div className='font-bold text-xl'>Comments :</div>
    { comments &&
        <CommentList comments={comments}/> 
    }
    </div>
  )
}

export default CommentsContainer
