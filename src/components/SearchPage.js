import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import SearchVideoCard from './SearchVideoCard';

const SearchPage = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search_query');
    const [searchResults, setSearchResults] = useState(null);

    useEffect( () => {
        const searchQueryHandler = async() =>{
            const data = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchQuery}&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
            const json = await data.json();
            setSearchResults(json.items);
        };

        searchQueryHandler();
    }, [searchQuery]);

  return (
    <div>
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
