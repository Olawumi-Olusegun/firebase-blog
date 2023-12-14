import React from 'react'
import Posts from '../../components/common/Posts/Posts'
import Follow from '../../components/common/UserToFollow/Follow'

export default function Home() {
  return (
    <section className='size flex gap-[5rem] relative '>
        <div className="flex-[2] py-8 mb-[4rem]">
          <Posts />
        </div>
        <div className='hidden md:inline-block p-7 md:w-[21rem] border-l border-gray-300'>
          <h3>Who to follow</h3>
          <Follow />
        </div>
    </section>
  )
}
