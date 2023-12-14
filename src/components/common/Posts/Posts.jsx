import React from 'react'
import useFetch from '../../../hooks/useFetch'
import Loading from '../../Loading';
import PostCard from './PostCard';

export default function Posts() {

  const { data: postData, isLoading } = useFetch("posts");

  if(isLoading) return <Loading />;

  return (
    <section className='flex flex-col gap-[2.5rem]'>
      {postData?.length > 0 
      ? postData.map((post) => <PostCard key={post.id} post={post} />)
      : <>
      <h2>No post yet</h2>
      </>}
    </section>
  )
}
