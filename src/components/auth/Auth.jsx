import React, { useState } from 'react'
import Modal from '../modal/Modal'
import { LiaTimesSolid } from 'react-icons/lia';
import { FcGoogle } from 'react-icons/fc';
import { MdFacebook } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import SignIn from './SignIn';
import Signup from './Signup';
import { auth, db, provider } from '../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { signInWithPopup } from 'firebase/auth';

const Auth = ({modal, setModal}) => {
    const navigate = useNavigate();
    const [createUser, setCreateUser] = useState(false);
    const [signinReq, setSignInReq] = useState("");

    const googleAuth = async () => {
        try {
           const createNewUser = await signInWithPopup(auth, provider);
            const newUser = createNewUser.user;
            const userRef = doc(db, "users", newUser.uid);
            const userDoc = await getDoc(userRef);
         
            if(!userDoc.exists()) {
                await setDoc(userRef, {
                    userId: newUser.uid,
                    username: newUser.displayName,
                    email: newUser.email,
                    userImage: newUser.photoURL,
                    bio: ""
                });

                navigate("/")
                toast.success("New user created successfully");
                setModal(false)
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }


    const hidden = modal ? "visible opacity-100" : "invisible opacity-0";

  return (
    <Modal modal={modal} setModal={setModal} hidden={hidden}>
        <section className={`shadow translate-all duration-500 z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-white ${hidden}`}>
            <button type='button' title='close modal' onClick={() => setModal(false)} className='absolute top-8 right-8 text-2xl hover:opacity-50'>
                <LiaTimesSolid />
            </button>

            <div className='flex flex-col justify-center items-center gap-[3rem]'>
                {
                    signinReq === "" 
                    ? <>
                        <h2 className='text-2xl pt-[5rem]'>{ createUser ? "Join Medium" : 'Welcome Back!'}</h2>
                        <div className='flex flex-col gap-4 w-fit mx-auto'>
                            <Button onClick={googleAuth} icon={<FcGoogle className='text-xl '/>} text={`${createUser ? "Sign Up" : "Sign In"} With Google`}  />
                            <Button icon={<MdFacebook className='text-xl text-blue-500' />} text={`${createUser ? "Sign Up" : "Sign In"} With Facebook`} />
                            <Button onClick={() => setSignInReq(createUser ? "signup" : "signin") } icon={<AiOutlineMail className='text-xl'/>} text={`${createUser ? "Sign Up" : "Sign In"} With Email`} />
                        </div>
                        <p>
                            {createUser ? "Already have an account?" : "No Account?" }
                            <button onClick={() => setCreateUser(prev => !prev)} className='text-green-600 hover:text-green-700 font-bold ml-1 '>
                                {createUser ? "Sign In" : "Create New Account" }
                            </button> 
                        </p>
                    </>
                    : signinReq === "signin" 
                    ? <SignIn setModal={setModal} setSignInReq={setSignInReq} />
                    : signinReq === 'signup'
                    ? <Signup setModal={setModal} setSignInReq={setSignInReq} />
                    : null
                }
                <p className='w-[90%] md:w-[30rem] mx-auto text-center text-sm mb-[3rem]'>
                    {`Click "Sign In" to agree to Medium's Terms of Service and acknowledge that Medium's Privacy Policy applies to you`}
                </p>
            </div>
        </section>
    </Modal>
  )
}

export default Auth

export const Button = ({icon, text, onClick}) => {
    return (
        <button onClick={onClick} className='flex items-center gap-10 sm:w-[20rem] hover:bg-black/5 border border-black px-3 py-2 rounded-full'>
            {icon} {text}
        </button>
    )
}