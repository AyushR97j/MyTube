import React from 'react'
import Button from './Button'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const buttonListData = ["All", "Cricket", "Football", "Music", "Alls", "Cricket", "Football", "Music", "All", "Cricket", "Football", "Music", "All", "Cricket", "Football", "Music", "All", "Cricket", "Football", "Music", "All", "Cricket", "Football", "Music"]

const ButtonList = () => {

  const scrollContRef = React.useRef();

  const leftScroll = () => {
    const scrollCont = scrollContRef.current;
    let width = scrollCont.clientWidth/4;
    
    scrollCont.scrollLeft -= width;
  }
  const rightScroll = () => {
    const scrollCont = scrollContRef.current;
    let width = scrollCont.clientWidth/4;
    //console.log(width)
    scrollCont.scrollLeft += width;
  }

  return (
    <div className='relative'>
      <div className='absolute w-full flex items-center mt-3'>
        <IoIosArrowBack className='rounded-full h-8 w-8 hover:bg-gray-300 ' onClick={leftScroll} />
        <div className='flex-grow'></div>
        <IoIosArrowForward className='rounded-full h-8 w-8 hover:bg-gray-300' onClick={rightScroll} />
      </div>
      <div className='w-full flex overflow-x-hidden scroll-smooth ml-4' ref={scrollContRef}>
      {buttonListData.map ((data, idx) =>
          <Button key={idx} name={data}/>
        )
      }
      </div>
    </div>
  )
}

export default ButtonList
