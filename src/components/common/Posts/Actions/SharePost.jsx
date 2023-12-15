import React, { useState } from 'react'
import DropDown from '../../../DropDown'
import { CiShare1 } from 'react-icons/ci';

import { 
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

import { 
  BiLink,
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoLinkedinSquare,
} from 'react-icons/bi'


export default function SharePost() {

  const [showDropDown, setShowDropDown] = useState(false);



  return (
    <div className='flex items-center relative'>
      <button type='button' title='Share' onClick={() => setShowDropDown((prev) => !prev)}>
        <CiShare1 className="text-2xl" />
      </button>
      <DropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} size="w-[12rem]">
        <Button onClick={() => {}} title="Copy link" icon={<BiLink />} />
        <Button onClick={() => {}} title="Share on Twitter" icon={<BiLogoTwitter />} />
        <Button onClick={() => {}} title="Share on Facebook" icon={<BiLogoFacebookCircle />} />
        <Button onClick={() => {}} title="Share on LinkedIn" icon={<BiLogoLinkedinSquare />} />
      </DropDown>
    </div>
  )
}


export const Button = ({onClick, icon, title}) => {
  return (
    <>
      <button onClick={onClick} className='p-2 hover:bg-gray-200 text-gray-500 hover:text-black/80 w-full text-sm text-left flex items-center gap-2 cursor-pointer'>
        <span className='text-[1.2rem]'>{icon}</span>
        <span>{title}</span>
      </button>
    </>
  )
}