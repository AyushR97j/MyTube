import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import {SiYoutubeshorts} from "react-icons/si";
import {MdOutlineSubscriptions} from "react-icons/md";
import * as PiIcons from "react-icons/pi";

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

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
  
  if(!isMenuOpen) return null;

  return (
    <div className='px-6 py-3 shadow-lg w-64 font-normal text-[1.1rem] pb-24 h-screen overflow-y-scroll'>
      <ul className='flex flex-col gap-3'>
        <Link to="/">
          <li className='flex items-center gap-4'>
            <div className='scale-125'>
              <GoHome />
            </div>
            <div>
              Home
            </div>
          </li>
        </Link>
          <li className='flex items-center gap-4'>
            <div className='scale-125'>
              <SiYoutubeshorts />
            </div>
            <div>
              Shorts
            </div>
          </li>
          <li className='flex items-center gap-4'>
            <div className='scale-125'>
            <MdOutlineSubscriptions />
            </div>
            <div>
              Subscriptions
            </div>
          </li>
      </ul>

      {/* <h1 className='font-bold pt-5'>Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul> */}

      <h1 className='font-bold my-3'>Explore</h1>
      {
        exploreIconNames.map(([iconName, label], index) => {
        const IconComponent = PiIcons[iconName];

        return (
          <div className='flex items-center my-3 gap-4' key={index}>
            {IconComponent && <IconComponent size={24} />}
            <span >{label}</span>
          </div>
        );
      })}
    </div>
  )
}

export default Sidebar
