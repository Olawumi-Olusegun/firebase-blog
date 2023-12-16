import React, { useState } from 'react'
import DropDown from '../../../DropDown'
import { CiShare1 } from 'react-icons/ci';
import { toast } from 'react-toastify';

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
  const urlPath = window.location.href;
  const handleCopyLink = async () => {
        try {
          await navigator.clipboard.writeText(urlPath);
          toast.success("Link copied");
          setShowDropDown(false);
        } catch (error) {
          toast.error(error?.message);
          setShowDropDown(false);
        }
  }

  return (
    <div className='flex items-center relative'>
      <button type='button' title='Share' onClick={() => setShowDropDown((prev) => !prev)}>
        <CiShare1 className="text-2xl" />
      </button>
      <DropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} size="w-[12rem]">
        <Button onClick={handleCopyLink} title="Copy link" icon={<BiLink />} />
        
        <TwitterShareButton url={urlPath}>
          <Button onClick={() => {}} title="Share on Twitter" icon={<BiLogoTwitter />} />
        </TwitterShareButton>

        <FacebookShareButton url={urlPath}>
          <Button onClick={() => {}} title="Share on Facebook" icon={<BiLogoFacebookCircle />} />
        </FacebookShareButton>

        <LinkedinShareButton url={urlPath}>
          <Button onClick={() => {}} title="Share on LinkedIn" icon={<BiLogoLinkedinSquare />} />
        </LinkedinShareButton>
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