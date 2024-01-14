import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Head from './Head'

const Body = () => {
  return (
    <div className='flex flex-wrap overflow-x-hidden'>
      <div className='fixed z-20 bg-white'>
        <Head />
      </div>
      <div className='flex w-screen mt-16 -z-0'>
        <Sidebar />
        <Outlet/>
      </div>
      
    </div>
  )
}

export default Body
