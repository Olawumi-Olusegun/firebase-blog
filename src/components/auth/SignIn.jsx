import React, { useState } from 'react'
import Input from '../Input'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignIn({setSignInReq, setModal}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    setIsLoading(true)
    const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
    const userRef = doc(db, "users", user.id);
    const userDoc = await getDoc(userRef);
    if(!userDoc.exists()) {
        await setDoc(userRef, {
            userId: user.uid,
            username: form.username,
            email: form.email,
            userImage: "",
            bio: ""
        });

        navigate("/")
        toast.success("Logged In successfully");
        setModal(false)
    }
    
  } catch (error) {
    toast.error(error?.message);
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className='size mt-[6rem] text-center px-5'>
        <h2 className='text-3xl'>Sign In With Email</h2>
        <p className='w-full sm-w-[25rem] mx-auto py-[3rem]'>Enter the email address associated with your account, and we'll send a magic link to your browser</p>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
            <Input form={form} setForm={setForm} type='email' title='email' />
            <Input form={form} setForm={setForm}  type='password' title='password' autoComplete="false" />
            
            <button 
            disabled={isLoading}
            className={`px-6 py-3 text-sm disabled:opacity-50 rounded-full text-white w-fit mx-auto bg-green-700 hover:bg-green-800 ${isLoading ? "cursor-no-drop" : "" }`}>
              {isLoading ? "Loading..." : "Sign In"}
            </button>

        </form>
        <button onClick={() => setSignInReq("")} className='flex items-center mx-auto space-x-2 mt-5 text-sm text-green-600 hover:text-green-700'>
            <MdKeyboardArrowLeft /> All Sign In Options
        </button>
    </div>
  )
}
