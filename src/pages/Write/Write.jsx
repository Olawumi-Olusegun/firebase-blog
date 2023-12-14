import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import Preview from './Preview';
import { Blog } from '../../context/Context';


export default function Write() {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const { publish, setPublish } = Blog();

  return (
    <section className='w-[90%] md:w-[90%]  lg:w-[60%] mx-auto py-[3rem] '>
        <input value={title} placeholder='Add Title' onChange={(event) => setTitle(event.target.value)} type="text" className='text-4xl p-2 w-full border border-gray-300 focus:outline-2 focus:outline-gray-500 outline-none' name='title' />
        <ReactQuill 
        theme="snow" 
        placeholder='Add Description' 
        value={description} 
        onChange={setDescription}
        className='write my-5'
        />
        <div className={` transition-all duration-200 ${publish ? "visible opacity-100" : "invisible opacity-0" }`}>
            <Preview setPublish={setPublish} title={title} description={description} />
        </div>
    </section>
  )
}
