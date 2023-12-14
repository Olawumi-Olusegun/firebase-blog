import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { Blog } from '../../../context/Context';
import Loading from '../../Loading';
import FollowButton from './FollowButton';
import { useNavigate } from 'react-router-dom';

export default function Follow() {
  const navigate = useNavigate();

  const { data, isLoading } = useFetch("users");

  const { currentUser } = Blog();

  const [count, setCount] = useState(5)
// .filter((user) => user?.userId !== currentUser?.uid)
  const users = data && data?.slice(0, count).filter((user) => user?.userId !== currentUser?.uid);

  if(isLoading) return <Loading />

  return (
    <div className=''>
      {users.length > 0 
      ?  users.map((user, index) => {
        const { userImage, bio, username, userId } = user;
        return (
          <div key={index} className='flex items-start gap-2 my-4'>
            <div onClick={() => navigate(`/profile/${userId}`)} className='flex flex-1 items-center gap-2 cursor-pointer'>
              <img src={userImage} alt={`${username}-profile-image`} className='w-[3rem] h-[3rem] border-2 rounded-full object-cover cursor-pointer' />
            <div className='flex flex-col gap-1'>
              <h2 className='font-bold capitalize'>{username}</h2>
              <span className='leading-4 text-gray-500 text-sm line-clamp-2'>{bio || "User has no bio"}</span>
            </div>
            </div>
            <FollowButton userId={userId} />
          </div>
        )
      })
      : null }
      {data.length > 5 && (
        <button
        onClick={() => setCount((prev) => users.length < data.length && prev + 3) }
          className='mb-3 text-gray-900 text-sm hover:underline'
        >
          Load more users
        </button>
      )}
    </div>
  )
}
