import React from 'react'
import { BiLock } from 'react-icons/bi';


export default function PrivateLists({username}) {
  return (
    <div className='flex flex-col justify-center items-center gap-[3rem] text-center'>
      <p>
        <span className='capitalize'> {username} saved posts are private </span>
      </p>
      <span className='text-[10rem] text-gray-500 '>
        <BiLock />
      </span>
    </div>
  )
}
