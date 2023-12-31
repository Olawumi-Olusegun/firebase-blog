import React from 'react'
import {LiaUserSolid} from 'react-icons/lia';
import { MdOutlineLocalLibrary } from 'react-icons/md';
import {BiSpreadsheet} from 'react-icons/bi';
import { HiOutlineChartBar } from 'react-icons/hi';
import {LiaEditSolid} from 'react-icons/lia';
import { Blog } from '../../context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { secretEmail } from '../../utils/helpers';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';


export default function UserModal({setModal}) {
    const navigate = useNavigate();
    const {currentUser} = Blog();

    const links = [
        {
            title: "Profile",
            icon: <LiaUserSolid />,
            path: `/profile/${currentUser?.uid}`
        },
        {
            title: "Library",
            icon: <MdOutlineLocalLibrary />,
            path: `/library`
        },
        {
            title: "Stories",
            icon: <BiSpreadsheet />,
            path: `/stories`
        },
        {
            title: "Stats",
            icon: <HiOutlineChartBar />,
            path: `/stats`
        },
    ];

    const authSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/demo");
        } catch (error) {
            toast.error(error?.message);
        }
    }


  return (
    <section className='absolute w-[18rem] border border-black/10 p-6 bg-white right-0 top-16 shadows rounded-md z-[60] text-gray-500'>
       
        <Link to="/" className='md:hidden flex items-center gap-1 text-gray-500'>
            <span className='text-3xl'>
                <LiaEditSolid />
            </span>
            <span className='text-sm mt-2'>Write</span>
        </Link>
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-5">
            {links.map((link, index) => (
                <Link onClick={() => setModal(false)} key={index} to={link.path} className='flex items-center gap-2 text-gray-500 hover:text-black/70'>
                    <span className='text-2xl'>{link.icon}</span>
                    <h2 className='text-md'>{link.title}</h2>
                </Link>
            ))}
        </div>

        <button onClick={authSignOut} title='signout' className='flex flex-col pt-5 cursor-pointer hover:text-black/70'>
            Sign Out
            <span className='text-sm'>{secretEmail(currentUser?.email)}</span>
        </button>
    </section>
  )
}
