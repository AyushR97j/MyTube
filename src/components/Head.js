import React, { useEffect, useState } from 'react';
import ytlogo from "../assets/images/ytLogo.png";
import menu from "../assets/images/menu.webp";
import userIcon from "../assets/images/userIcon.png";
import searchIcon from "../assets/images/searchIcon.png";
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';

const Head = () => {

  //const REACT_APP_YOUTUBE_SEARCH_API =  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="
  
  const[searchQuery, setSearchQuery] = useState("");
  const[suggestions, setSuggestions] = useState([]);
  const[showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => getSearchSuggestion(), 200);

    return() => {
      clearTimeout(timer);
    }
  }, [searchQuery]);


  const getSearchSuggestion = async () => {
    const data = await fetch(process.env.REACT_APP_YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    //console.log(json[1]);
    setSuggestions(json[1]);
  }

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
      <div className='col-span-10 px-10 ml-32'>
        
        <div className='flex'>
          <input 
          className='px-5 w-1/2 border border-gray-400 p-2 rounded-l-full' 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          />
          <button className='border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100'>
            <img className='h-6' alt="icon" src={searchIcon} />
          </button>
        </div>

        {showSuggestions && (
          <div className='fixed bg-white py-2 px-2 w-[37rem] z-50 shadow-lg rounded-lg border border-gray-100'>
          <ul>
          {suggestions.map((s) => (
                <li key={s} className='py-2 px-3 shadow-sm hover:bg-gray-100'>
                {s}
                </li>
          ))}
          </ul>
        </div>
        )}
      </div>
      <div className='col-span1'>
        <img className='h-8' alt="user-icon" src={userIcon} />
      </div>
    </div>
  )
}

export default Head
