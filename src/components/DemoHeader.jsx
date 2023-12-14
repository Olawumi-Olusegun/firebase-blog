import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { navs } from './../data/nav';
import Auth from './auth/Auth';

export default function DemoHeader() {

  const [isActive, setIsActive] = useState(false);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    const navbarScroll = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    }
    window.addEventListener("scroll", navbarScroll);

    return () => window.removeEventListener("scroll", navbarScroll);
  }, []);


  return (
    <>
    <Auth modal={modal} setModal={setModal} />
    <header className={`border-b border-black sticky top-0 z-50 transition-all duration-500 ${isActive ? "bg-white" : "bg-banner" }`}>
      <nav className="size h-[70px] flex items-center justify-between">
        <Link to="/">
          <img
          src="/assets/medium.png" alt="logo"
          className="h-[2.5rem]"
          />
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden text-sm sm:flex items-center gap-5">
            {navs.map((nav, index) => (
              <Link key={index} to={nav.path} className='cursor-pointer'>{nav.title}</Link>
            ))}
          </div>
            <div className='relative flex items-center gap-5'>
              <button onClick={() => setModal(true)} type='button' className='hidden text-sm sm:flex items-center gap-5'>Sign In</button>
              <button onClick={() => setModal(true)} type='button' className={`rounded-full cursor-pointer px-3 p-2 text-sm font-semibold text-white transition-all duration-500 ${isActive ? "bg-green-700"  :"bg-black" } `}>Get Started</button>
            </div>
        </div>
      </nav>
    </header>

    </>
  )
}
