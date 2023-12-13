import React from 'react'

export default function ProfileAbout({currentUser, setEditModal}) {
  
  return (
    <div className='w-full'>
      <p className='text-2xl first-letter:uppercase'>
        {currentUser?.bio || "No bio yet!"}
      </p>
      <div className='text-right'>
        <button onClick={() => setEditModal(true)} type='button' title='Edit' className="border border-black py-2 px-5 rounded-full text-black mt-[3rem]">Edit</button>
      </div>
    </div>
  )
}
