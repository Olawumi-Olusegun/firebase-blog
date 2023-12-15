import React from 'react'

const Modal = ({children, modal, setModal,  hidden}) => {

  const hideModal = modal ? "visible opacity-100" : "invisible opacity-0";

  return (
    <>
    <div
      onClick={() => setModal(false)}
      className={`bg-white/50 fixed inset-0 z-[40] transition-all duration-500 ${hideModal ?? hidden}`}>
    </div>
        {children}
    </>
  )
}

export default Modal