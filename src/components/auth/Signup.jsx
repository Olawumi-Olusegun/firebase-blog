import React from 'react'
import Input from '../Input'
import { MdKeyboardArrowLeft } from 'react-icons/md'

export default function SignUp({setSignInReq}) {
  return (
    <div className='size mt-[6rem] text-center px-5'>
        <h2 className='text-3xl'>Sign Up With Email</h2>
        <p className='w-full sm-w-[25rem] mx-auto py-[3rem]'>Enter the email address associated with your account, and we'll send a magic link to your browser</p>
        <form className='flex flex-col gap-5'>
            <Input type='text' title='username' />
            <Input type='email' title='email' />
            <Input type='password' title='password' />
            <Input type='password' title='confirmPassword' />
            <button type='button' className='px-6 py-3 text-sm rounded-full text-white w-fit mx-auto bg-green-700 hover:bg-green-800'>Sign In</button>
        </form>
        <button onClick={() => setSignInReq("")} className='flex items-center mx-auto space-x-2 mt-5 text-sm text-green-600 hover:text-green-700'>
            <MdKeyboardArrowLeft /> All sign Sign Upn Options
        </button>
    </div>
  )
}
