import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { useSelector } from 'react-redux'

const MainContainer = () => {

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)
  const theme = useSelector((store) => store.app.theme);
  return (
    <div className={`w-full mt-2 bg-white ${isMenuOpen ? 'ml-[235px]' : ''} ${theme === 'dark' ? 'bg-black text-white' : ''} overflow-x-hidden `}>
      <ButtonList />
      <VideoContainer page="feed" />
    </div>
  )
}

export default MainContainer
