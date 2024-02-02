import React from 'react'
import Button from './Button'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from 'react-redux';

const buttonListData = ["All", "Cricket", "Music", "Rohit Sharma", "IIT", "Politics", "New", "K-pop", "K-drama", "Football", "Romance", "Space", "Cricket", "Football", "Music", "All", "Cricket", "Football", "Music", "All", "Cricket", "Football", "Music"]

const ButtonList = () => {

  const scrollContRef = React.useRef();
  const theme = useSelector((store) => store.app.theme);

  const leftScroll = () => {
    const scrollCont = scrollContRef.current;
    let width = scrollCont.clientWidth/4;
    
    scrollCont.scrollLeft -= width;
  }
  const rightScroll = () => {
    const scrollCont = scrollContRef.current;
    let width = scrollCont.clientWidth;
    scrollCont.scrollLeft += width;
  }

  return (
    <div className={`relative z-10 pr-12 pl-8 ${theme === 'dark' ? 'bg-black text-white' : ''}`}>
      <div className='absolute w-full flex items-center mt-3 transition-all duration-1000 '>
        <IoIosArrowBack className={`rounded-full h-8 w-8 bg-gray-50 hover:bg-gray-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`} onClick={leftScroll} />
        <div className='flex-grow'></div>
        <IoIosArrowForward className={`rounded-full h-8 w-8 mr-24 bg-gray-50 hover:bg-gray-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`} onClick={rightScroll} />
      </div>
      <div className='w-100vw flex overflow-x-hidden scroll-smooth ml-9 mr-12' ref={scrollContRef}>
      {buttonListData.map ((data, idx) =>
          <Button key={idx} name={data}/>
        )
      }
      </div>
    </div>
  )
}

export default ButtonList
