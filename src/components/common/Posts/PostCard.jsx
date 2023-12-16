import React from 'react'
import useFetch from '../../../hooks/useFetch';
import Loading from '../../Loading';
import { readTime } from '../../../utils/helpers';
import moment from 'moment';
import SavedPost from './Actions/SavedPost';
import Actions from './Actions/Actions';
import { Link } from 'react-router-dom';

export default function PostCard({post}) {
    const {title, desc, createdAt, postImage, id: postId, userId, username } = post;

    const { data, isLoading } = useFetch("users");
    const getUserData = data && data?.find((user) => user.id === userId);

    if(isLoading) return <Loading />

  return (
    <section>
        <div className='flex flex-col sm:flex-row gap-4 cursor-pointer'>
            <Link to={`/post/${postId}`} className='flex-[2.5] '>
                <p className="pb-2 font-semibold capitalize">{username}</p>
                <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">{title}</h2>
                <div className='py-1 text-gray-500 line-clamp-2 leading-5' dangerouslySetInnerHTML={{__html: desc}} />
            </Link>
            {
                postImage && (
                <div className='flex-[1] '>
                    <img src={postImage} alt={title} title={title} className='w-[53rem] h-[8rem] object-cover rounded-md' />
                </div>
                )
            }
        </div>
        <div className='flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0]'>
            <p className='text-xs text-gray-600'>{readTime({__html: desc })} min read. {moment(createdAt).format("MMM DD")} </p>
            <div className='flex items-center gap-3'>
                <SavedPost post={post} getUserData={getUserData} />
                {post.userId === userId && <Actions post={post} postId={postId} title={title} desc={desc} /> }
            </div>
        </div>
    </section>
  )
}
