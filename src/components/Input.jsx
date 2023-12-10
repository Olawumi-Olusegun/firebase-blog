import React from 'react'

export default function Input({type="text", title="title", ...props}) {
  return (
    <div className='flex flex-col gap-2 items-start w-full'>
        <label htmlFor={title} className='text-left text-sm capitalize w-full'>{title}</label>
        <input
        title={title}
        type={type}
        name={title}
        {...props} 
        className='border-b border-black outline-none w-full p-2'
        />

    </div>

  )
}
