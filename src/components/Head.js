import React, { useEffect, useState } from 'react';
import ytlogo from "../assets/images/ytLogo.png";
import menu from "../assets/images/menu.webp";
import userIcon from "../assets/images/userIcon.png";
import searchIcon from "../assets/images/searchIcon.png";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { cacheResults } from '../utils/searchSlice';
import { Link, useNavigate } from 'react-router-dom';

const Head = () => {

  //const REACT_APP_YOUTUBE_SEARCH_API =  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="
  
  const[searchQuery, setSearchQuery] = useState("");
  const[suggestions, setSuggestions] = useState([]);
  const[showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion()
      }
    }, 200);

    return() => {
      clearTimeout(timer);
    }
  }, [searchQuery]);


  const getSearchSuggestion = async () => {
    const data = await fetch(process.env.REACT_APP_YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1]
      })
    )
  }

 

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSearch = () => {
    setShowSuggestions(false)
    if(searchQuery){
      navigate(`/results?search_query=${searchQuery}`)
    }
  };

  const handleSuggestionSearch = (event) => {
    navigate(`/results?search_query=${event?.target?.textContent}`);
    setShowSuggestions(false)
  };

  return (
    <div className='grid grid-flow-col p-5 my-2 shadow-lg w-screen'>
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
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}

          />
          <button className='border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100' onClick={handleSearch}>
            <img className='h-6' alt="icon" src={searchIcon} />
          </button>
        </div>

        {showSuggestions && (
          <div className='fixed bg-white py-2 px-2 w-[30rem] z-50 shadow-lg rounded-lg border border-gray-100' >
          
          {suggestions?.map((suggestion, i) => (
            <Link
              to={`/results?search_query=${suggestion}`}
              className="rounded-lg bg-transparent pl-4 hover:bg-richblack-50"
              key={i}
              >
                <p className='px-3 h-8 shadow-sm cursor-pointer hover:bg-gray-100' onClick={handleSuggestionSearch}>
                  {suggestion}
                </p>
            </Link>
          ))}
          </div>
        )}
      </div>
      
      <div className='col-span1'>
        <img className='h-8' alt="user-icon" src={userIcon} />
      </div>
    </div>
  )
}

export default Head;
