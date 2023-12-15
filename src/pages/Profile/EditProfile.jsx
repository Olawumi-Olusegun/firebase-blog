import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../components/modal/Modal'
import { LiaTimesSolid } from 'react-icons/lia'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'


export default function EditProfile({editModal, setEditModal, userData}) {

    const formInitialValues = {
        username: "",
        bio: "",
        userImage: ""
    }

    const [form, setForm] = useState(formInitialValues);

      const [isLoading, setIsLoading] = useState(false);

    const imageRef = useRef(null);



    const openFile = () => imageRef.current.click();

    const [imageUrl, setImageUrl] = useState("");

    const handleImageChange = (event) => {
        event.preventDefault();
        setImageUrl(URL.createObjectURL(event.target.files[0]))
    }

    const handleDeleteImage = () => setImageUrl("");

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        if(event.target.files) {
            setForm((prevValues) => ({...prevValues, [name]: event.target.files[0]}))
            setImageUrl(URL.createObjectURL(event.target.files[0]))
            return;
        }
        setForm((prevValues) => ({...prevValues, [name]: value}))
      }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            
            setIsLoading(true);

            let imageUrl = "";

            if(form.userImage?.name) {
                const storageRef = ref(storage, `images/${form.userImage.name}`)
                await uploadBytes(storageRef, form?.userImage);
                imageUrl = await getDownloadURL(storageRef);
            }

            const docRef = doc(db, "users", userData?.userId);
          
            await updateDoc(docRef, {
                username: form.username,
                bio: form.bio,
                userImage: imageUrl ? imageUrl : form.userImage,
                userId: userData?.userId,
            });
            setEditModal(false);
            toast.success("Updated successfully")
        } catch (error) {
            toast.error(error?.message)
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        if(userData) setForm(userData)
        else setForm(formInitialValues)
    }, []);

   

  return (
    <Modal modal={editModal} setModal={setEditModal}>
        <div className={`center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-[50] mb-[3rem] p-[2rem] transition-all duration-300 ${editModal ? "visible opacity-100" : "invisible opacity-0"} `}>
            <div className="flex items-center justify-between">
                <h2 className='font-bold text-xl'>Profile Information</h2>
                <button className='text-xl p-2 rounded-full duration-300 hover:bg-black hover:text-white' type='button' title='Close' onClick={() => setEditModal(false)}>
                    <LiaTimesSolid />
                </button>
            </div>
            <section className='mt-6'>
                <p className='pb-3 text-sm text-gray-500'>Photo</p>
                <div className='flex gap-[2rem]'>
                    <div className='w-[5rem]'>
                        <img onClick={openFile} src={imageUrl ? imageUrl : form.userImage ? form.userImage : "/assets/avatar.jpg"} alt="avatar" 
                        className='min-h-[5rem] min-w-[5rem] object-cover border border-gray-400 rounded-full'
                        />
                        <input onChange={handleChangeInput} name='userImage' ref={imageRef} type="file" hidden accept='image/jpg, image/png, image/jpeg' />
                    </div>

                    <div>
                     <div className="flex gap-4 text-sm">
                        <button onClick={openFile} type='button' title='Upload Image' className='text-green-600'>Update</button>
                        <button onClick={handleDeleteImage} type='button' title='Remove Image' className='text-red-600'>Remove</button>
                     </div>
                     <p className='w-full sm-[20rem] text-gray-500 text-sm pt-2'>
                        Recommended: Square JPG, PNG or JPEG at least 1,000 pixels per side.
                     </p>
                    </div>

                </div>
            </section>
            <section>
                <form onSubmit={handleFormSubmit} className='w-full'>
                    
                    <div className='pt-[1rem] text-sm'>
                        <label htmlFor="username">Username*</label>
                        <input value={form.username} onChange={handleChangeInput} id='username' maxLength={50} type="text" className='p-1 border-b border-black w-full outline-none' placeholder='Username' name='username' />
                        <p className='text-sm text-gray-600 pt-2'>Appears on your profile page, as your bio {form.username.length}/50 </p>
                    </div>

                    <div  className='pt-[1rem] text-sm'>
                        <label htmlFor="bio">Bio*</label>
                        <input value={form.bio} onChange={handleChangeInput} id='bio' maxLength={160} type="text" className='p-1 border-b border-black w-full outline-none' placeholder='Bio' name='bio' />
                        <p className='text-sm text-gray-600 pt-2'>Appears on your profile page, beside stories {form.bio.length}/160 </p>
                    </div>

                    <div className='flex items-center justify-center gap-4 pt-[2rem]'>
                        <button type='button' disabled={isLoading} title='Cancel' onClick={() => setEditModal(false)} className='border disabled:cursor-no-drop duration-300 hover:bg-green-600 hover:text-white border-green-600 py-2 px-5 rounded-full text-green-600'>Cancel</button>
                        <button disabled={isLoading} title='Save' className='border duration-300 disabled:cursor-no-drop border-green-800 hover:border-green-600 py-2 px-5 rounded-full bg-green-800 hover:bg-green-600 text-white'>
                            {isLoading ? "Updating..." : "Save"}
                        </button>
                    </div>

                </form>
            </section>
        </div>
    </Modal>
  )
}
