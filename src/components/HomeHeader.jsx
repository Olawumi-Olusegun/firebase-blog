import React, { useState } from 'react'
import {BsMedium} from 'react-icons/bs'
import {CiSearch} from 'react-icons/ci'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {MdKeyboardArrowDown} from 'react-icons/md'
import { Link } from 'react-router-dom'
import Search from './Search'
import Modal from './modal/Modal'
import UserModal from './modal/UserModal'
import { Blog } from '../context/Context'
import Loading from './Loading'

export default function HomeHeader() {

  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const { allUsers, userLoading, currentUser } = Blog();


  const userData = allUsers?.find((user) => user.id === currentUser.uid) ?? null;

  if(userLoading) {
    return <Loading />
  }


  return (
    <header className="border-b border-gray-200">
 
    <div className="size h-[60px] flex items-center justify-between">
      {/* left side  */}
      <div className="flex items-center gap-3 flex-1">
        <Link to={"/"}>
          <span className="text-5xl">
            <BsMedium />
          </span>
        </Link>
        <Search modal={searchModal} setModal={setSearchModal} />
      </div>
      {/* right side  */}
      <div className="flex items-center gap-3 sm:gap-7">
        <span
          onClick={() => setSearchModal(true)}
          className="flex sm:hidden text-3xl text-gray-500 cursor-pointer">
          <CiSearch />
        </span>
        
        <span className="text-3xl text-gray-500 cursor-pointer ">
          <IoMdNotificationsOutline />
        </span>
        <div className="flex items-center relative">
          <img
            onClick={() => setModal(true)}
            className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
            src={`${userData.userImage ?? "/assets/avatar.jpg"}`}
            alt="profile-img"
            title='profile-image'
          />
          <span className="text-gray-500 cursor-pointer">
            <MdKeyboardArrowDown />
          </span>
          <Modal modal={modal} setModal={setModal}>
            <div
              className={`${
                modal ? "visible opacity-100%" : "invisible opacity-0"
              } transition-all duration-100`}>
              <UserModal setModal={setModal} />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  </header>
  )
}
