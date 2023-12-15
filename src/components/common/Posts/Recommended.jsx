import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import Post from './Post';

export default function Recommended({post: singlePost}) {

    const { data } = useFetch("posts");
    const [commonTags, setCommonTags] = useState([])
    const recommendedPost = []

    useEffect(() => {
        data && data.forEach((post) => {

            if(post.id === singlePost?.id) return;

            const postTags = post.tags;
            const commonTags = postTags.filter((tag) => singlePost?.tags.includes(tag))
            if(commonTags.length > 0) {
                recommendedPost.push({...post, commonTags})
            }
        });
        recommendedPost.sort(() => Math.round() * -0.5);
        const minRecommendation = 4;
        const slicedPost = recommendedPost.slice(0, minRecommendation);
        setCommonTags(slicedPost);
    }, [data, singlePost]);

  return (
    <section className='bg-gray-100'>
        <div className="w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem] ">
            <h2 className='text-xl font-bold'>Recommended Posts</h2>
            {commonTags.length > 0 
            ? (<div className='grid grid-cols-card gap-[2rem] my-[3rem]'>
                {commonTags.map((post, index) => <Post key={index} post={post} />) }
            </div>)
            : <p className=''>  No recommended post found on your preference </p> 
            }
        </div>
    </section>
  )
}
