import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SearchVideoCard from './SearchVideoCard';

const SearchPage = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search_query');
    const [searchResults, setSearchResults] = useState(null);
    const theme = useSelector((store) => store.app.theme);

    useEffect( () => {
        const searchQueryHandler = async() =>{
            const data = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchQuery}&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
            const json = await data.json();
            setSearchResults(json.items);
        };

        searchQueryHandler();
    }, [searchQuery]);

  return (
    <div className={`w-full pl-6 pt-4 ${theme === 'dark' ? 'bg-black text-white' : ''}`}>
        {searchResults?.map( (searchResult, index) => (
            <Link className='flex-shrink' key={searchResult.id.videoId} to={"/watch?v="+searchResult.id.videoId} >
                <SearchVideoCard key={index} info={searchResult} />
            </Link>
        )
        )}
    </div>
  )
};

export default SearchPage;
