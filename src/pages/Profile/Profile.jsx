import React, { useState } from 'react'
import ProfileHome from '../../components/activities/ProfileHome';
import ProfileList from '../../components/activities/ProfileList';
import ProfileAbout from '../../components/activities/ProfileAbout';
import Modal from '../../components/modal/Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import { discoverActions } from '../../data/nav';
import { IoMdSettings } from 'react-icons/io';
import EditProfile from './EditProfile';
import { Blog } from '../../context/Context';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import useSingleFetch from '../../hooks/useSingleFetch';

const activities = [
    {
        title: "Home",
        Comp: ProfileHome
    },
    {
        title: "Lists",
        Comp: ProfileList
    },
    {
        title: "About",
        Comp: ProfileAbout
    },
];


export default function Profile() {

    const [currentActive, setCurrentActive] = useState(activities[0]);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const { allUsers, isLoading, currentUser } = Blog();
    const { userId } = useParams();
   const { data: follows, } = useSingleFetch("users", userId, "follows");
   const { data: followers, } = useSingleFetch("users", userId, "followers");
    const getUserData = allUsers?.find((user) => user.id === userId) ?? null;

    if(isLoading) return <Loading />

  return (
    <section className='size flex gap-[4rem] relative'>
        <div className="mt-[9rem] flex-[2]">
            
            <div className="flex items-center gap-4">
                <h2 className="text-3xl sm:text-5xl font-bold capitalize">{getUserData?.username}</h2>
                <p className='text-gray-500 text-xs sm:text-sm'>Followers({followers?.length})</p>
                <p className='text-gray-500 text-xs sm:text-sm'>Following({follows?.length})</p>
            </div>

        <div className='flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]'>
            {activities.map((activity, index) => (
                <button key={index} onClick={() => setCurrentActive(activity)} type='button' className={`py-[0.5rem] ${activity.title === currentActive.title ? "border-b border-gray-500 duration-150" : "" } `}>
                    {activity.title}
                </button>
             ))}
        </div>

        <currentActive.Comp getUserData={getUserData} setEditModal={setEditModal} />

        </div>

        <button onClick={() => setModal(prev => !prev)} className='fixed top-[8rem] md:hidden right-0 w-[2rem] h-[2rem] bg-black text-white rounded-tl-md rounded-bl-md flex items-center justify-center'>
            <IoMdSettings />
        </button>

        <Modal modal={modal} setModal={setModal}>
            <div className={`fixed right-0 top-0 bottom-0 w-[18rem] bg-white md:relative flex-[1] border-l border-gray-300 p-[2rem] z-10 transition-all duration-300 ${modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"}`}>
                <div className='text-right mb-4'>
                <button onClick={() => setModal(false)} className='p-2 hover:bg-black hover:text-white rounded-full duration-300 md:hidden cursor-pointer'>
                    <LiaTimesSolid />
                </button>
                </div>
                {/* Profile details */}
                <div className="sticky top-7 flex flex-col justify-between">
                    <img src={`${getUserData?.userImage ? getUserData?.userImage : "/assets/avatar.jpg"}`} alt="profile" className='w-[3.5rem] h-[3.5rem] object-cover rounded-full' />
                   
                    <h2 className='py-2 font-bold capitalize'>Olawumi Olusegun</h2>
                    <p className='text-gray-500 first-letter:uppercase '>Software Engineer</p>
                    {currentUser?.uid === getUserData?.userId && (
                        <button onClick={() => setEditModal(true)} type='button' title='Edit Profile' className='text-green-700 pt-6 text-sm w-fit font-semibold'>Edit Profile</button>
                    ) }
                </div>
                <div className='flex-[1] flex items-center flex-wrap gap-3 pt-8'>
                {
                    discoverActions.map((action, index) => (
                        <span key={index} className='text-xs text-black1 '>{action}</span>
                    ))
                }
                </div>
            </div>
        </Modal>
        {editModal && <EditProfile 
                userData={getUserData} 
                editModal={editModal} 
                setEditModal={setEditModal} 
        />}
    </section>
  )
}
