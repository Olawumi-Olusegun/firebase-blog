import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import ReactQuill from 'react-quill';
import TagsInput from 'react-tagsinput'
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Blog } from '../../context/Context';
import { useNavigate } from 'react-router-dom';


export default function Preview({setPublish, title, description}) {
    const { currentUser } = Blog();
    const navigate = useNavigate();
    const imageRef = useRef(null);
    const [desc, setDesc] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleImageClick = () => imageRef.current.click();

    const [preview, setPreview] = useState({
        title: "",
        description: "",
        photo: "",
    });

    const [imageUrl, setImageUrl] = useState("");
    const [tags, setTags] = useState([]);

    const handleImageChange = (event) => {
        const imageObjectUrl = URL.createObjectURL(event.target.files[0]);
        setImageUrl(imageObjectUrl);
        setPreview((prevState) => ({...prevState, photo: event.target.files[0]}));
    }

    useEffect(() => {
        if(title || description) {
            setPreview((prevState) => ({...prevState, title, description }));
            setDesc(description);
        } else {
            setPreview((prevState) => ({...prevState, title: "", description: "" }));
        }
    }, [title, description]);

    const handlePreviewSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            //ValidationRule: preview.title.length must not be less than 15
            let imageUrl = "";
            if(preview.photo?.name) {
                const storageRef = ref(storage, `images/${preview.photo?.name}`)
                await uploadBytes(storageRef, preview.photo);
                imageUrl = await getDownloadURL(storageRef);
            }

            const postCollection = collection(db, "posts");

            await addDoc(postCollection, {
                userId: currentUser?.uid,
                title: preview.title,
                desc,
                tags,
                postImage: imageUrl,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                pageViews: 0,
            });

            toast.success("Post created successfully");
            setPreview({...preview, title: "", description: "", photo: ""});

            setPublish(false);
            navigate("/");
        } catch (error) {
            console.log(error)
            toast.error(error?.message);
        } finally {
            setIsLoading(false)
        }
    }


  return (
    <section className='absolute inset-0 bg-white z-30'>
        <div className='size my-[2rem]'>
            <span className='absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer '>
                <button onClick={() => setPublish(false)} className='text-xl p-2 rounded-full duration-300 hover:bg-black hover:text-white' type='button' title='Close modal'>
                        <LiaTimesSolid />
                </button>
            </span>
            <form onSubmit={handlePreviewSubmit} className='w-full'>
                <div className='mt-[8rem] flex flex-col lg:flex-row gap-10'>
                    <div className='flex-1'>
                        <h3>Story Preview</h3>
                        <div style={{ backgroundImage: `url(${imageUrl})`}} onClick={handleImageClick} className='w-full h-[200px] cursor-pointer rounded-md object-cover bg-gray-100 my-3 grid place-items-center bg-cover bg-no-repeat'>
                            {!imageUrl && <p>Add Image</p>}
                        </div>
                        <input onChange={handleImageChange} type="file" hidden ref={imageRef} />
                        <input 
                        type="text" 
                        value={preview.title} 
                        placeholder='Add Title'
                        onChange={(event) => setPreview({...preview, title: event.target.value}) }
                        className=' p-2 w-full border border-gray-300 focus:outline-2 focus:outline-gray-500 outline-none' name='title' />
                        
                        <ReactQuill 
                        theme="snow" 
                        placeholder='Add Description' 
                        value={desc} 
                        onChange={setDesc}
                        className='write my-5'
                        />
                        <p className='text-gray-500 pt-4 text-sm'>
                            <span className='font-bold'>Note:</span> Change here will affect how your story appears in public places like Medium's homepage and in subscribers inboxes - not the content of the story itself.
                        </p>
                    </div>
                    <div className='flex-1 flex flex-col gap-4 mb-5 md:mb-0'>
                        <h3 className='text-2xl '>Publishing to: <span className='font-bold'>Olawumi Olusegun</span></h3>
                        <p>Add or change topics up to 5 readers know what your story is about</p>
                        <TagsInput value={tags} onChange={setTags} />
                        <button disabled={isLoading} className={`btn bg-green-800 hover:bg-green-600 duration-300 w-fit text-white rounded-full disabled:cursor-no-drop `}>
                            {isLoading ? "Submitting" : "Publish Now"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>
  )
}
