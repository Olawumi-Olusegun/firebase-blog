import React from 'react'
import useFetch from '../../hooks/useFetch'
import Loading from '../Loading';
import PostCard from '../common/Posts/PostCard';

export default function ProfileHome({ getUserData }) {
    const { data, isLoading } = useFetch("posts");

    if(isLoading) return <Loading />

    const userPosts = data && data?.filter((post) => post?.userId === getUserData?.userId);

  return (
    <div className='flex flex-col gap-5 mb-[4rem]'>
        {userPosts.length === 0 && <p className='text-gray-500'><span className='capitalize'>{getUserData?.username}</span> has not post</p> }
        {userPosts.map((post, index) => <PostCard post={post} key={index} />)}
    </div>
  )
}
