import React from 'react';
import ytlogo from "../assets/images/ytLogo.webp";
import menu from "../assets/images/menu.webp";
import userIcon from "../assets/images/userIcon.png";
import searchIcon from "../assets/images/searchIcon.png";

const Head = () => {
  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
      <div className='flex col-span-1'>
        <img
            className='h-8'
            alt="menu"
            src={menu}
        />
        <img
            className='h-8 mx-2'
            alt="ytLogo"
            src={ytlogo}
        />
      </div>
      <div className='col-span-10  flex items-center justify-center mr-96'>
        <input className='w-1/2 border border-gray-400 p-2 rounded-l-full' type="text"/>
        <button className='border border-gray-400 p-2 rounded-r-full bg-gray-100'>
          <img className='h-6' alt="icon" src={searchIcon} />
        </button>
      </div>
      <div className='col-span1'>
        <img className='h-8' alt="user-icon" src={userIcon} />
      </div>
    </div>
  )
}

export default Head
