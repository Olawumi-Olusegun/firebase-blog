import React from 'react'
import { Blog } from '../../context/Context'

export default function ProfileAbout({getUserData, setEditModal}) {
    const { currentUser } = Blog();
  return (
    <div className='w-full'>
      <p className='text-2xl first-letter:uppercase'>
        {getUserData?.bio || "No bio yet!"}
      </p>
      {currentUser?.uid === getUserData?.userId && (
        <div className='text-right'>
          <button onClick={() => setEditModal(true)} type='button' title='Edit' className="border border-black py-2 px-5 rounded-full text-black mt-[3rem]">Edit</button>
        </div>
      )}
    </div>
  )
}
