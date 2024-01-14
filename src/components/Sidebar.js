import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import {SiYoutubeshorts} from "react-icons/si";
import { FiSettings, FiHelpCircle } from "react-icons/fi";
import * as PiIcons from "react-icons/pi";
import { useEffect } from 'react';

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

    const url = new URLSearchParams(window.location.search);
    //console.log("our url",url.get('v'));
    const isWatchPage = (url.get('v') != null);
    // console.log("isWatchPage", isWatchPage)
  
  const exploreIconNames = [
    ['PiFire','Trending'],
    ['PiShoppingBagOpenLight', 'Shopping'],
    ['PiMusicNote', 'Music'],
    ['PiFilmSlate', 'Films'],
    ['PiPlayCircle', 'Live'],
    ['PiGameControllerDuotone', 'Gaming'],
    ['PiNewspaperLight', 'News'],
    ['PiTrophy', 'Sport'],
    ['PiLightbulb', 'Learning'],
    ['PiCoatHangerLight', 'Fashion & beauty'],
    ['PiApplePodcastsLogoLight', 'Podcasts'],
  ];

  useEffect(() => {

  },[])
  
  if(!isMenuOpen) return null;

  return (
    <div className={`fixed h-screen px-6 py-3 pb-32 shadow-lg w-1/6 font-normal text-[1.1rem] overflow-y-scroll ${isWatchPage ? "absolute z-10 bg-white shadow-black" : ""}`}>
      <ul className='flex flex-col gap-'>
        <Link to="/">
          <li className='flex items-center gap-4 py-2 pl-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-200'>
            <div className='scale-125'>
              <GoHome />
            </div>
            <div>
              Home
            </div>
          </li>
        </Link>
        <Link to={"/explore/shorts"}>
        <li className='flex items-center gap-4 py-2 pl-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-200'>
            <div className='scale-125'>
              <SiYoutubeshorts />
            </div>
            <div>
              Shorts
            </div>
          </li>
        </Link>
          {/* <li className='flex items-center gap-4'>
            <div className='scale-125'>
            <MdOutlineSubscriptions />
            </div>
            <div>
              Subscriptions
            </div>
          </li> */}
      </ul>

      {/* <h1 className='font-bold pt-5'>Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul> */}

      <h1 className='my-3 font-semibold ml-0 text-lg'>Explore</h1>
      {
        exploreIconNames.map(([iconName, label], index) => {
          const IconComponent = PiIcons[iconName];
          return (
            <Link to={`/explore/${label}`}  key={index}>
              <div className='flex items-center gap-4 py-2 pl-2 rounded-lg transition duration-200 ease-in-out hover:bg-gray-200'>
                {IconComponent && <IconComponent size={24} />}
                <span >{label}</span>
              </div>
            </Link>
            
          );
      })}

      <div className='bg-slate-300 my-4 w-full rounded-full h-[1.5px]'></div>

        <li className='flex items-center gap-4 py-2 pl-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-200'>
            <div className='scale-125'>
              <FiSettings />
            </div>
            <div>
              Setting
            </div>
          </li>
          <li className='flex items-center gap-4 py-2 pl-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-200'>
            <div className='scale-125'>
              <FiHelpCircle />
            </div>
            <div>
              Send Feedback
            </div>
          </li>
          <li className='flex items-center gap-4 py-2 pl-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-200'>
            <div className='scale-125'>
              <FiHelpCircle />
            </div>
            <div>
              Help
            </div>
          </li>
    </div>
  )
}

export default Sidebar
