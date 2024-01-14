import React from 'react'

const Button = ({name}) => {
  return (
    <div className="flex flex-shrink-0 justify-center items-center overflow-y-hidden">
      <button className='px-5 py-2 m-2 bg-gray-100 rounded-lg'>{name}</button>
    </div>
  )
}

export default Button
