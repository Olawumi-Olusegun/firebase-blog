import React from 'react'
import useSingleFetch from '../../hooks/useSingleFetch';
import { Blog } from '../../context/Context';
import Loading from '../Loading';
import PrivateLists from './PrivateLists';
import PostCard from '../common/Posts/PostCard';

export default function ProfileList({ getUserData }) {
  const { currentUser } = Blog();
  const { data, isLoading } = useSingleFetch("users", currentUser?.uid, "savedPost");

  if(isLoading) return <Loading />

  return (
    <div>
    { currentUser && currentUser?.uid === getUserData?.userId ? (
      <div className="flex flex-col gap-[2rem] mb-[2rem]">
        {data.length === 0 && (
          <p className="text-gray-500">
            <span className="capitalize mr-1">{getUserData?.username}</span>{" "}
            has no saved post
          </p>
        )}
        {isLoading ? ( <Loading /> ) : (
          data?.map((post, i) => <PostCard post={post} key={i} />)
        )}
      </div>
    ) : (
      <PrivateLists username={getUserData?.username} />
    )}
  </div>
  )
}
