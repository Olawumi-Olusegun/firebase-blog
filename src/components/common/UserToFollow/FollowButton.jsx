import React, { useEffect, useState } from 'react'
import { Blog } from './../../../context/Context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import useSingleFetch from '../../../hooks/useSingleFetch';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export default function FollowButton({userId}) {
    const [isFollowed, setIsFollowed] = useState(false);
    const {currentUser} = Blog();
    const {data, isLoading} = useSingleFetch("users", currentUser?.uid, "follows");
    const { pathname } = useLocation();

    const handleFollow = async () => {
        try {
            if(currentUser?.uid) {
              const followRef = doc(db, "users", currentUser?.uid, "follows", userId);
              const followerRef = doc(db, "users", userId, "followers", currentUser?.uid);
              if(isFollowed) {
                await deleteDoc(followRef);
                await deleteDoc(followerRef);
                toast.success("User is unfollowed")
              } else {
                await setDoc(followRef, { userId })
                await setDoc(followerRef, { userId })
                toast.success("User is followed")
              }
            }
        } catch (error) {
          toast.success(error?.message)
        }
    }

    useEffect(() => {
      setIsFollowed(data && data?.findIndex((item) => item.id === userId) !== -1);
  }, [data]);

  return (
    <button 
      className={` px-3 
      ${pathname === '/' ? " border border-black py-[0.2rem] rounded-full" : ""} 
      ${isFollowed ? "text-gray-500 border-none" : "" } 
      `}
      onClick={handleFollow}
      >
        {isFollowed ? "Following" : "Follow" }
    </button>
  )
}
