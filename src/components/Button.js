import React from 'react'
import { useSelector } from 'react-redux'

const Button = ({name}) => {
  const theme = useSelector((store) => store.app.theme);

  return (
    <div className="flex flex-shrink-0 justify-center items-center overflow-y-hidden">
      <button className={`px-5 py-2 m-2 bg-gray-100 rounded-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>{name}</button>
    </div>
  )
}

export default Button
