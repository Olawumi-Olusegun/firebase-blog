import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import DropDown from '../../../DropDown';
import { useNavigate } from 'react-router-dom'
import { Blog } from '../../../../context/Context';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { toast } from 'react-toastify';

export default function Actions({postId, title, desc }) {
    const navigate = useNavigate();
    const [showDropDown, setShowDropDown] = useState(false);
    const { setUpdateDate, currentUser } = Blog();

    const handleClick = () =>  setShowDropDown(prevSate => !prevSate);

    const handleEdit = () => {
        navigate(`/editpost/${postId}`);
        setUpdateDate({ title, desc });
    }

    const handleDeletePost = async () => {
        try {
            const deleteRef = doc(db, "posts", postId);

            const likeRefs = doc(db, "posts", postId, "likes", currentUser?.uid);
            const commentRefs = doc(db, "posts", postId, "comments", currentUser?.uid);
            const savedPostRefs = doc(db, "users", currentUser?.uid, "savedPost", postId);

            await deleteDoc(deleteRef);
            await deleteDoc(likeRefs);
            await deleteDoc(commentRefs);
            await deleteDoc(savedPostRefs);

            toast.success("Post deleted");
            navigate('/');
        } catch (error) {
            toast.error(error?.message);
        }
    }


  return (
    <div className='relative'>
        <button type='button' title='More' className='text-2xl' onClick={handleClick}>
            <BsThreeDots />
            <DropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} size="w-[7rem]">
                <Button onClick={handleEdit} className='' title='Edit Story' />
                <Button onClick={handleDeletePost} className='' title='Delete Story' />
            </DropDown>
        </button>
    </div>
  )
}


const Button = ({onClick, title}) => {
    return <div 
    className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left first-letter:
        ${title === "Delete Story" ? "text-red-600" : ""}
    ` } 
    onClick={onClick}>
        {title}
    </div>
}