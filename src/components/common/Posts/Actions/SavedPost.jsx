import React, { useEffect, useState } from 'react'
import { CiSaveDown2 } from 'react-icons/ci';
import { Blog } from '../../../../context/Context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../../../hooks/useSingleFetch';
import Loading from '../../../Loading';


export default function SavedPost({post}) {
    const [isSaved, setIsSaved] = useState(false);
    const {currentUser, setAuthModal} = Blog();

    const {data, isLoading} = useSingleFetch("users", post?.userId, "savedPost");



    const handleSave = async () => {
        try {
            if(currentUser) {
                const savedRef = doc(db, "users", post?.userId, "savedPost", post?.id);
                if(isSaved) {
                    await deleteDoc(savedRef);
                    toast.success("Post deleted");
                } else {
                    await setDoc(savedRef, { ...post });
                    toast.success("Post saved");
                }
            }else {
                setAuthModal(true)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        setIsSaved(data && data.find((item) => item.id === currentUser?.uid) !== -1)
    }, [data, currentUser?.uid]);

    if(isLoading) return <Loading />

  return (
    <>
     <button title='save post' onClick={handleSave} className='hover:opacity-60 '>
        <CiSaveDown2 className={`text-2xl pointer-events-none ${isSaved ? "text-yellow-600" : ""} `} />
     </button>
    </>
  )
}
