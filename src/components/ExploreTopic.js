import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VideoContainer from './VideoContainer';

const ExploreTopic = () => {
    const { category } =useParams();
    useEffect( () => {
    },[category])
    
    
  return (
    <div className='w-full overflow-x-hidden'>
      <VideoContainer page={category}  />
    </div>
  )
}

export default ExploreTopic
