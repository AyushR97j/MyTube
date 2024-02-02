import React, { useEffect, useState } from "react";
import myTubeLogo from "../assets/images/myTubeLogo.png";
import myTubeLogText from "../assets/images/myTubeLogoText.png";
import searchIcon from "../assets/images/searchIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleTheme } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode, MdOutlineEmojiPeople  } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";


const Head = () => {
  //const REACT_APP_YOUTUBE_SEARCH_API =  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const theme = useSelector((store) => store.app.theme);
  //console.log("curr theme", theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(
      process.env.REACT_APP_YOUTUBE_SEARCH_API + searchQuery
    );
    const json = await data.json();
    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSearch = () => {
    setShowSuggestions(false);
    if (searchQuery) {
      navigate(`/results?search_query=${searchQuery}`);
    }
  };

  const handleSuggestionSearch = (event) => {
    navigate(`/results?search_query=${event?.target?.textContent}`);
    setShowSuggestions(false);
  };

  const handleThemeChange = () => {
    //console.log("1",theme)
    dispatch(toggleTheme())
    //console.log("2",theme)
  }

  return (
    <div className={`grid grid-flow-col px-5 py-4 w-screen ${theme === 'dark' ? 'bg-black text-white' :''}`}>
      <div className="flex col-span-1 items-center gap-3 ml-2">
        <div onClick={() => toggleMenuHandler()} className="cursor-pointer">
          <AiOutlineMenu size={24}/>
        </div>
        
        <a href="/">
        <div className="flex">
          <img className="h-8 mx-2" alt="ytLogo" src={myTubeLogo} />
          <img className="h-8 mx-2 -ml-2" alt="ytLogo" src={myTubeLogText} />
        </div>
         
        </a>
      </div>

      <div className="col-span-10 px-10 ml-32">
        <div className="flex">
          <input
            className={`px-5 w-1/2 border border-gray-400 p-2 rounded-l-full ${theme === 'dark' ? 'bg-gray-900' : ''}`}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 500)}
          />
          <button
            className={`border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100 ${theme === 'dark' ? 'bg-gray-900' : ''}`}
            onClick={handleSearch}
          >
            <img className="h-6" alt="icon" src={searchIcon} />
          </button>
        </div>

        {showSuggestions && (
          <div className={`fixed py-2 px-2 w-[30rem] z-50 shadow-lg rounded-lg border border-gray-100 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
            {suggestions?.map((suggestion, i) => (
              <Link
                to={`/results?search_query=${suggestion}`}
                className="rounded-lg bg-transparent pl-4 hover:bg-richblack-50"
                key={i}
              >
                <p
                  className="px-3 h-8 shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={handleSuggestionSearch}
                >
                  {suggestion}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="col-span1 flex items-center gap-4">
        <button onClick={handleThemeChange}>
          {theme === "light" ? <MdOutlineLightMode size={28} /> : <MdOutlineDarkMode size={28}  />}
        </button>
        <a href="https://linkedin.com/in/ayushr97j">
          <MdOutlineEmojiPeople size={28}/>
        </a>
      </div>
    </div>
  );
};

export default Head;
