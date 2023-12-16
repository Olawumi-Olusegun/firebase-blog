import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { Blog } from '../../../context/Context';

export default function EditPost() {

    const { updateData, setTitle, setDescription, title, description } = Blog();

    useEffect(() => {
        if(updateData) {
            setTitle(updateData.title)
            setDescription(updateData.desc)
        }
    }, [updateData])

  return (
    <section className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]  '>
        <input 
        value={title} 
        onChange={(event) => setTitle(event.target.value)} 
        type="text" 
        placeholder='Enter Title' 
        className=' p-2 text-4xl w-full border border-gray-300 focus:outline-2 focus:outline-gray-500 outline-none'
         />

        <ReactQuill 
        value={description}
        onChange={setDescription}
        placeholder='Enter Description' 
        className='text-[4rem] my-3 write' 
        />
    </section>
  )
}
