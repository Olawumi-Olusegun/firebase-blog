import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import DropDown from '../../../DropDown';


export default function Actions() {
    const [showDropDown, setShowDropDown] = useState(false);

    const handleClick = () =>  setShowDropDown(prevSate => !prevSate);


  return (
    <div className='relative'>
        <button type='button' title='More' className='text-2xl' onClick={handleClick}>
            <BsThreeDots />
            <DropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} size="w-[7rem]">
                <Button onClick={() => {}} className='' title='Edit Story' />
                <Button onClick={() => {}} className='' title='Delete Story' />
            </DropDown>
        </button>
    </div>
  )
}


const Button = ({onClick, title}) => {
    return <div 
    className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left first-letter:
        ${title === "Delete Story" ? "text-red-600" : ""}
    ` } 
    onClick={onClick}>
        {title}
    </div>
}