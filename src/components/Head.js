import React from 'react';
import ytlogo from "../assets/images/ytLogo.png";
import menu from "../assets/images/menu.webp";
import userIcon from "../assets/images/userIcon.png";
import searchIcon from "../assets/images/searchIcon.png";
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';

const Head = () => {

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };


  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
      <div className='flex col-span-1'>
        <img
            onClick={() => toggleMenuHandler()}
            className='h-8 cursor-pointer'
            alt="menu"
            src={menu}
        />
        <a href="/">
        <img
            className='h-8 mx-2'
            alt="ytLogo"
            src={ytlogo}
        />
        </a>
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
