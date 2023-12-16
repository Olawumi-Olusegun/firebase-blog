import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import Loading from '../../Loading';
import { Blog } from '../../../context/Context';
import FollowButton from '../UserToFollow/FollowButton';
import { readTime } from '../../../utils/helpers';
import moment from 'moment'
import SavedPost from './../Posts/Actions/SavedPost'
import Like from './Actions/Like';
import Comment from './Actions/Comment';
import SharePost from './Actions/SharePost';
import Actions from './Actions/Actions';
import Recommended from './Recommended';
import Comments from '../Comments/Comments';

export default function SinglePost() {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = Blog();

    const fetchPost = async () => {
        try {
            setIsLoading(true);
            const postRef = doc(db, "posts", postId);
            const getPost = await getDoc(postRef);
            if(getPost.exists()) {
                const postData = getPost.data();
                if(postData?.userId) {
                    const userRef = doc(db, "users", postData.userId);
                    const getUser = await getDoc(userRef);
                    if(getUser.exists()) {
                        const { createdAt, ...restData } = getUser.data();
                        setPost({ ...postData, ...restData, id: postId })
                        setIsLoading(false);
                    }
                }
            }
            
        } catch (error) {
            toast.error(error?.message)
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPost();
    }, [postId, post?.userId])

    if(isLoading || !post?.id) return <Loading />
    if(!currentUser) return Navigate({to: "/demo"})

    const { title, desc, postImage, username, createdAt, userImage, userId } = post;

  return (
    <>
        <section className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem] '>
            <h2 className='text-4xl font-semibold capitalize'>{title}</h2>
            <div className='flex items-center gap-2 py-[2rem]'>
                <Link to={`/profile/${userId}`}>
                    <img src={userImage || "/assets/avatar.jpg"} alt="user-image" className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer " />
                </Link>
                <div>
                    <div className='capitalize'>
                        <span>{username}</span>
                        {currentUser?.uid == userId && <FollowButton userId={userId} />}
                    </div>
                    <p className="text-sm text-gray-500">
                        {readTime({__html: desc})} min read.
                        <span className='ml-1'>{moment(createdAt).fromNow()}</span>
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-between border-y border-gray-200 py-[0.5rem] '>
                <div className="flex items-center gap-5 ">
                    <Like postId={postId} />
                    <Comment />
                </div>
                <div className='flex items-center pt-2 gap-5'>
                    <SavedPost post={post} />
                    <SharePost />
                    {currentUser?.uid === post?.userId && <Actions postId={postId} title={post.title} desc={post.desc} /> }
                </div>
            </div>
            <div className='mt-[3rem]'>
               {postImage && (
                <img src={postImage} alt="post-image" className='w-full h-[400px] object-cover rounded-md' />
               ) } 
                <div className='mt-6 text-justify ' dangerouslySetInnerHTML={{__html: desc }} />
            </div>
        </section>
        {post?.id && <Recommended post={post} />}
        <Comments postId={postId} />
    </>
  )
}
