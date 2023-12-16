import React, { useState } from 'react'
import { Blog } from '../../../context/Context'
import moment from 'moment';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import DropDown from '../../DropDown';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';

export default function Comment({comment, postId}) {
    const { allUsers, currentUser } = Blog();
    const [showDropDown, setShowDropDown] = useState(false);
    const [more, setMore] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [editCommentText, setEditCommentText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getUserData = allUsers.find((user) => user.id === comment.userId);
    const { comment: commentText, createdAt, id: commentId } = comment;


    const handleRemoveComment = async () => {
        try {
            const commentRef = doc(db, "posts", postId, "comments", commentId);
            await deleteDoc(commentRef);
            toast.success("Comment deleted");
            setShowDropDown(false);
        } catch (error) {
            toast.error(error?.message);
        }
    }

    const handleEditCommentText = () => {
        setEditComment(true);
        setShowDropDown(false);
        setEditCommentText(commentText)
    }

    const handleUpdateComment = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            const commentRef = doc(db, "posts", postId, "comments", commentId);
            await updateDoc(commentRef, {
                comment: editCommentText,
                updatedAt: Date.now(),
            });
            toast.success("Comment upfated");
            setEditComment(false);
            setShowDropDown(false);
            setEditCommentText("");
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <section className='border-b'>

    {editComment 
        ? <>
        <div className='bg-white shadows p-4 '>
            <form onSubmit={handleUpdateComment} className="w-full">
                <textarea 
                    value={editCommentText} 
                    onChange={(event) => setEditCommentText(event.target.value)} 
                    name="comment" 
                    className='resize-none outline-none text-sm' 
                    placeholder='Edit comment'>
                </textarea>

                <div className='flex items-center justify-center gap-3'>
                    <button disabled={isLoading} onClick={() => setEditComment(false)} type='button' title='Cancel' className='text-sm w-fit disabled:cursor-no-drop'>Cancel</button>
                    <button disabled={isLoading} title='Update' className='btn text-sm bg-green-700 rounded-full text-white disabled:cursor-no-drop'>
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </div>

            </form>
        </div>
        </> 
        : <>
            <div className='flex items-center gap-5 pt-[1rem]'>
                <img 
                src={`${getUserData.userImage} || "/assets/avatar.jpg"`} 
                alt="user-Image" 
                className='w-[2rem] h-[2rem] object-cover rounded-full  '
                />
                <div className='flex-1 flex justify-between'>
                    <div>
                        <h2 className='text-sm capitalize'>{getUserData.username}</h2>
                        <p className='text-sm text-gray-400'>{moment(createdAt).fromNow()}</p>
                    </div>
                    <div className='relative '>
                        { currentUser && currentUser?.uid && (
                            <>
                                <button onClick={() => setShowDropDown(true)} className='text-2xl hover:opacity-70'>
                                    <BiDotsHorizontalRounded />
                                </button>
                                <DropDown size="w-[10rem]" showDropDown={showDropDown} setShowDropDown={setShowDropDown}>
                                    <Button onClick={handleEditCommentText} title="Edit" />
                                    <Button onClick={handleRemoveComment} title="Delete" />
                                </DropDown>
                            </>
                        ) }
                    </div>
                </div>
            </div>
            <p className='py-4 text-sm text-justify'>
                { more ? commentText : commentText.substring(0, 100) }
                {commentText.length > 100 && (
                    <button onClick={() => setMore((prev) => !prev)}> 
                        {more ? "...less" : "...more"} 
                    </button>
                ) }
            </p>
    </> }


    </section>
  )
}

const Button = ({onClick = () => {}, title = ""}) => {
    return (
        <button title={title} onClick={onClick} className='p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left'>
            {title}
        </button>
    )
}