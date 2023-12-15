import React from 'react'
import useFetch from '../../../hooks/useFetch';
import Loading from '../../Loading';
import { readTime } from '../../../utils/helpers';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

export default function Post({post}) {
    const navigate = useNavigate();

    const { title, desc, createdAt, postImage, id: postId, userId } = post;

    const { data, isLoading } = useFetch("users");

    if(isLoading) return <Loading />

    const getUser = data?.find((user) => user?.id === userId);
  
  return (
    <Link to={`/post/${postId}`} className='w-full cursor-pointer ' >
        <img src={postImage} alt="post-image" className='w-full h-[200px] object-cover rounded-md' />
        <div className='flex items-center gap-1 py-3'>
            <img src={getUser?.userImage || "/assets/avatar.jpg"} alt="user-image" className='w-[2rem] h-[2rem] my-2 object-cover rounded-full ' />
            <h3 className='text-sm capitalize'> {getUser?.username} </h3>
        </div>
        <h2 className='font-extrabold leading-5 line-clamp-2'>{title}</h2>
        <div className='line-clamp-2 my-3 text-gray-500 leading-5 ' dangerouslySetInnerHTML={{__html: desc}} />
        <p className='text-sm text-gray-600 '>
            {readTime({__html: desc})} min read <span className='ml-3'> {moment(createdAt).format("MMM DD ")} </span> 
        </p>
    </Link>
  )
}
