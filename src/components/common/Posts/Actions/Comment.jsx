import React from 'react'
import { FaRegComment } from 'react-icons/fa';


export default function Comment() {
  return (
    <button type='button' title='Comment' className="flex items-center gap-1 text-sm">
        <FaRegComment  className="text-[1.2rem]" />
        <span>1</span>
    </button>
  )
}
