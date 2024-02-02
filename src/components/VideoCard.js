import React from 'react'

const VideoCard = ({info}) => {
    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails } = snippet;
    const url = new URLSearchParams(window.location.search);
    //console.log("our url",url.get('v'));
    const isWatchPage = (url.get('v') != null);
    // console.log("info",info);
    //console.log("watch page",isWatchPage);

  return (
    <div className={`m-2 p-2 w-72 ${isWatchPage ? 'flex flex-row gap-3 p-2 w-10/12 h-32' : ''}`}>
      <img className='rounded-lg' alt="thumbnail" src={thumbnails.medium.url} />
      <div>
        <div className={`font-bold py-0 line-clamp-2 pt-2 ${isWatchPage ? 'w-[80%]' : ''} `}>{title}</div>
        <div className='line-clamp-1 w-64'>{channelTitle}</div>
        <div>{statistics?.viewCount} views</div>
      </div>
    </div>
  )
}

export default VideoCard
