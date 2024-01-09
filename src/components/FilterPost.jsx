import React from 'react'
import { useParams } from 'react-router-dom'
import { Blog } from '../context/Context';
import Loading from './Loading';
import PostCard from './common/Posts/PostCard';

const FilterPost = () => {
    const { tag } = useParams();
    const { postData, postLoading } = Blog();

    const filteredData = postData.length && postData.filter((post) => post.tags.includes(tag));
    const hasFilteredData =  filteredData.length;

  return (
    <section className='size my-[2rem]'>
        <div className='text-3xl pb-6 border-b border-black/10 mb-[3rem]'>
            <h3>
                {hasFilteredData ? "Your Filtered Posts" : "There is no post with this tag" }
            </h3>
            {postLoading ? <Loading /> : (
                <div className='lg:max-w-[60%] flex flex-col gap-[2rem]'>
                {hasFilteredData && filteredData.map((post, index) => (
                    <PostCard key={index} post={post} />
                )) }
                </div>
            ) }
        </div>
    </section>
  )
}

export default FilterPost