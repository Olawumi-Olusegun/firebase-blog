import React from 'react'

const Modal = ({children, modal, setModal, hidden}) => {

  return (
    <>
    <div 
    // onClick={() => setModal(false)}
    className={` bg-white/50 fixed inset-0 z-[60] transition-all duration-500 ${hidden}`}>
        {children}
    </div>
    </>
  )
}

export default Modal