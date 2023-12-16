import { useState } from 'react';
import Modal from './modal/Modal'
import { CiSearch } from 'react-icons/ci';
import { Blog } from '../context/Context';
import { useNavigate } from 'react-router-dom';

export default function Search({modal, setModal}) {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {postData} = Blog();

  const filterSearchedPost = postData && postData?.filter((post) => post.title.toLowerCase().includes(search.toLocaleLowerCase()) );

  const handleNavigateSearchedPost = (postLink) => {
    navigate(postLink);
    setSearch("")
  }

  
  return (
  <Modal modal={modal} setModal={setModal}>
      <div className={`absolute  sm:relative px-2 right-0 left-0 top-[4rem] sm:left-0 sm:top-0
        ${ modal
            ? "visible opacity-100"
            : "invisible sm:visible sm:opacity-100 opacity-0"
        }
        transition-all duration-100 w-full`}>
        <div className="flex items-center border-2 focus-within:border-black/30 gap-1 duration-150 bg-gray-100 px-2 rounded-full relative z-10">
          <span className="text-2xl text-gray-400">
            <CiSearch />
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="bg-transparent outline-none py-[0.7rem] text-sm w-full"
            type="text"
            placeholder="Search"
          />

        {
          search && (
          <div className='absolute left-0 right-0 top-full bg-white shadows rounded-md '>
            {filterSearchedPost.length > 0 
            ? <>
             { filterSearchedPost.map((post) => (
                <div onClick={() => handleNavigateSearchedPost(`/post/${post.id}`)} key={post.id} className='p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer ' >
                  <h2 className='line-clamp-1 capitalize text-sm font-bold'>{post.title}</h2>
                  <div className='text-sm text-gray-500 line-clamp-2' dangerouslySetInnerHTML={{__html: post.desc}} />
                </div>
              ))}
            </> 
            : <p className='text-sm text-gray-500 p-3'>No post found</p> }
          </div>
          )
        }

        </div>
      </div>
  </Modal>
  )
}
