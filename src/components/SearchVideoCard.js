import React from 'react'

const SearchVideoCard = ({info}) => {
    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className='w-full mx-8 my-4 p-2 flex gap-10'>
      <img className='rounded-xl scale-110' alt="thumbnail" src={thumbnails.medium.url} />
      <ul>
        <li className='font-bold py-2'>{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics?.viewCount} views</li>
      </ul>
    </div>
  )
}

export default SearchVideoCard;
