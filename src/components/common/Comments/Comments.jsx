import React, { useEffect, useState } from 'react'
import Modal from '../../modal/Modal'
import { LiaTimesSolid } from 'react-icons/lia'
import { Blog } from '../../../context/Context';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../../hooks/useSingleFetch';
import Loading from '../../Loading';
import Comment from './Comment';



export default function Comments({postId}) {
    const [comment, setComment] = useState("");
    const {currentUser, allUsers } = Blog();
    const { showCommentModal, setShowCommentModal, setCommentLength } = Blog();
    const [commentData, setCommentData] = useState([]);

    const getUserData = allUsers.find((user) => user.id === currentUser?.uid);
    const { data: comments, loading: commentLoading} = useSingleFetch("posts", postId, "comments")

    const handleWriteComment = async (event) => {
        event.preventDefault();
        try {
            const commentRef = collection(db, "posts", postId, "comments");
            await addDoc(commentRef, {
                comment,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                userId: currentUser?.uid,
                });

                toast.success("Comment added");
                setComment("");
        } catch (error) {
            toast.error("Comment added");
        }
    }

    useEffect(() => {
        if(comments) {
            setCommentLength(comments?.length || 0)
        }
    }, [comments]);

    if(commentLoading) return <Loading />

  return (
    <Modal modal={showCommentModal} setModal={setShowCommentModal}>
        <section className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadows p-5 overflow-y-auto transition-all duration-500 ${showCommentModal ? "translate-x-0" : "translate-x-[23rem]" } `}>
            <div className='flex items-center justify-between'>
                <h3 className='text-xl font-bold w-full'>Responses ({comments?.length || 0 })</h3>
                <button onClick={() => setShowCommentModal(false)} type='button' title='Close' className='flex items-center justify-center p-2 hover:bg-black hover:text-white rounded-full duration-300'>
                    <LiaTimesSolid />
                </button>
            </div>
            <form onSubmit={handleWriteComment}>
                {currentUser?.uid &&  (
                    <div className='shadows p-3 my-5 overflow-hidden'>
                        <div className="flex items-center gap-2 mb-5 ">
                            <img src={`${getUserData.userImage} || /assets/avatar.jpg`} alt="profile-image" className='w-[2rem] h-[2rem] object-cover rounded-full' />
                            <h3 className='capitalize text-sm'>
                                {getUserData.username}
                            </h3>
                        </div>
                        <textarea 
                        name="comment" 
                        id="comment" 
                        placeholder='Comment...'
                        // cols="30" 
                        // rows="10"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        className='w-full outline-none resize-none text-sm border px-2 pt-4 rounded-md'
                        >
                                
                        </textarea>
                        <div className='flex items-center justify-center gap-4 my-3'>
                            <button onClick={() => setComment("")} type='button' title='Cancel' className='text-sm'>Cancel</button>
                            <button title='Response' className='btn text-sm bg-green-700 rounded-full text-white'>Response</button>
                        </div>
                    </div>
                ) }
            </form>
            <div className='border-t py-4 mt-8 flex flex-col gap-8 '>
                {comments && comments.length > 0 
                ? comments?.map((comment) => <Comment key={comment.id} comment={comment} postId={postId} />)
                : <p>No coment for this post</p> 
                }
            </div>

        </section>
    </Modal>
  )
}
