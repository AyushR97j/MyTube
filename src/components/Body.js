import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Head from './Head'

const Body = () => {
  return (
    <div className='flex flex-wrap overflow-x-hidden'>
      <div>
        <Head />
      </div>
      <div className='flex w-screen'>
        <Sidebar />
        <Outlet/>
      </div>
      
    </div>
  )
}

export default Body
