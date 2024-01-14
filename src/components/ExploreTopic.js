import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VideoContainer from './VideoContainer';
import { useSelector } from 'react-redux';

const ExploreTopic = () => {
    const { category } = useParams();
    const isMenuOpen = useSelector( (store) => store.app.isMenuOpen)
    useEffect( () => {
    },[category])
    
    
  return (
    <div className={`w-full overflow-x-hidden ${isMenuOpen ? 'ml-[260px]' : ''}`}>
      <VideoContainer page={category}  />
    </div>
  )
}

export default ExploreTopic
