import React, { useEffect, useState } from 'react'
import { PiHandsClappingDuotone } from 'react-icons/pi'
import { Blog } from '../../../../context/Context'
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../../../hooks/useSingleFetch';
import { formatNumber } from '../../../../utils/helpers';


export default function Like({postId}) {

  const [isLiked, setIsLiked] = useState(false);

  const { currentUser, setAuthModal } = Blog();

  const {data} = useSingleFetch("posts", postId, "likes");

  const handleLike = async () => {
    try {
      if(currentUser?.uid) {
        const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
        if(isLiked) {
          await deleteDoc(likeRef);
        } else {
          await setDoc(likeRef, { userId: currentUser?.uid });
        }
      } else {
        setAuthModal(true)
      }
    } catch (error) {
        toast.error(error?.message);
    }
  }

  useEffect(() => {
    setIsLiked(data && data.findIndex((item) => item?.id === currentUser?.uid) !== -1);
  }, [data])

  return (
    <button onClick={handleLike} type='button' title='Comment' className="flex items-center gap-1 text-sm">
        <PiHandsClappingDuotone className={`text-2xl ${isLiked ? "text-black" : "text-gray-500" } `} />
        <span>{formatNumber(data?.length)}</span>
    </button>
  )
}
