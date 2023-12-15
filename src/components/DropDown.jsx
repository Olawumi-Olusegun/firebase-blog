import React, { useEffect, useRef } from 'react'

export default function DropDown({children, size, showDropDown, setShowDropDown}) {

    const dropdownRef = useRef(null);
    
    useEffect(() => {
        const clickOutside = (event) => {
            if (showDropDown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropDown(false);
            }
        }
        window.addEventListener("mousedown", clickOutside);
        return () => window.removeEventListener("mousedown", clickOutside);
    }, [showDropDown, dropdownRef]);

  return (
    <>
    {showDropDown && (
    <div ref={dropdownRef} className={`shadows flex flex-col absolute right-0 top-[2rem] bg-white ${size} `}>
        {children}
    </div>
    )}
    </>
  )
}
