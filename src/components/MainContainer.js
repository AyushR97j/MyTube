import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const MainContainer = () => {
  return (
    <div className='w-full overflow-x-hidden'>
      <ButtonList />
      <VideoContainer page="feed" />
    </div>
  )
}

export default MainContainer
