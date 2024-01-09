import React from 'react'
import { discoverActions, discovers } from '../data/nav'
import { useNavigate } from 'react-router-dom'

export default function Discover() {
  const navigate = useNavigate();
  return (
    <div className='sticky top-[6rem]'>
      <div className="border-b border-gray-400 pb-7">
        <h2 className='font-semibold'>
          Discover more of what matters to you
        </h2>
        <div className='my-2 flex items-center flex-wrap gap-3'>
          {discovers.map((discover, index) => (
            <button 
            onClick={() => navigate(`/filter/${discover.toLocaleLowerCase()}`)}
            type='button'
            key={index}
            className='bg-gray-200 hover:bg-gray-500 hover:text-white transition-colors duration-300 py-2 px-3 text-sm rounded-full'>{discover}</button>
          ))
          }
        </div>
          <button className='text-green-600 text-sm py-3 hover:text-black1'>See more topics</button>
      </div>
      <div className='flex items-center flex-wrap gap-3 leading-3 pt-3'>
        {discoverActions.map((action, index) => (
          <button 
          type='button'
          key={index}
          className='text-md text-black1'>{action}</button>
        ))}
      </div>
    </div>
  )
}
