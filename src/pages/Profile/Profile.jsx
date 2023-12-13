import React, { useState } from 'react'
import ProfileList from '../../components/activities/ProfileList';
import ProfileName from '../../components/activities/ProfileName';
import ProfileAbout from '../../components/activities/ProfileAbout';
import Modal from '../../components/modal/Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import { discoverActions } from '../../data/nav';
import { IoMdSettings } from 'react-icons/io';
import EditProfile from './EditProfile';
import { Blog } from '../../context/Context';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';

const activities = [
    {
        title: "Home",
        Comp: ProfileName
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

    const { allUsers, isLoading } = Blog();
    const { userId } = useParams();
  
    const currentUser = allUsers?.find((user) => user.id === userId) ?? null;

    if(isLoading) {
        return <Loading />
    }

  return (
    <section className='size flex gap-[4rem] relative'>
        <div className="mt-[9rem] flex-[2]">
            
            <div className="flex items-center gap-4">
                <h2 className="text-3xl sm:text-5xl font-bold capitalize">{currentUser?.username}</h2>
                <p className='text-gray-500 text-xs sm:text-sm'>Followers(2)</p>
                <p className='text-gray-500 text-xs sm:text-sm'>Following(10)</p>
            </div>

        <div className='flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]'>
            {activities.map((activity, index) => (
                <button key={index} onClick={() => setCurrentActive(activity)} type='button' className={`py-[0.5rem] ${activity.title === currentActive.title ? "border-b border-gray-500 duration-150" : "" } `}>
                    {activity.title}
                </button>
             ))}
        </div>

        <currentActive.Comp currentUser={currentUser} setEditModal={setEditModal} />

        </div>

        <button onClick={() => setModal(prev => !prev)} className='fixed top-[8rem] md:hidden right-0 w-[2rem] h-[2rem] bg-black text-white flex items-center justify-center'>
            <IoMdSettings />
        </button>

        <Modal modal={modal} setModal={setModal}>
            <div className={`fixed right-0 top-0 bottom-0 w-[18rem] bg-white md:relative flex-[1] border-l border-gray-300 p-[2rem] z-10 transition-all duration-300 ${modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"}`}>
                <div className='text-right mb-4'>
                <button onClick={() => setModal(false)} className='p-2 hover:bg-black/20 rounded-full duration-150 md:hidden cursor-pointer'>
                    <LiaTimesSolid />
                </button>
                </div>
                {/* Profile details */}
                <div className="sticky top-7 flex flex-col justify-between">
                    <img src={`${currentUser?.userImage ? currentUser?.userImage : "/assets/avatar.jpg"}`} alt="profile" className='w-[3.5rem] h-[3.5rem] object-cover rounded-full' />
                    {/* src={imageUrl ? imageUrl : form.userImage ? form.userImage : "/assets/avatar.jpg"} */}
                    <h2 className='py-2 font-bold capitalize'>Olawumi Olusegun</h2>
                    <p className='text-gray-500 first-letter:uppercase '>Software Engineer</p>
                    <button onClick={() => setEditModal(true)} type='button' title='Edit Profile' className='text-green-700 pt-6 text-sm w-fit font-semibold'>Edit Profile</button>
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
                userData={currentUser} 
                editModal={editModal} 
                setEditModal={setEditModal} 
        />}
    </section>
  )
}
