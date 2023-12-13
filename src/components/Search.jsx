import Modal from './modal/Modal'
import { CiSearch } from 'react-icons/ci';

export default function Search({modal, setModal}) {

  return (
  <Modal modal={modal} setModal={setModal}>
      <div className={`absolute sm:relative px-2 right-0 left-0 top-[4rem] sm:left-0 sm:top-0
        ${ modal
            ? "visible opacity-100"
            : "invisible sm:visible sm:opacity-100 opacity-0"
        }
        transition-all duration-100 w-full`}>
        <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10">
          <span className="text-2xl text-gray-400">
            <CiSearch />
          </span>
          <input
            className="bg-transparent outline-none py-[0.7rem] text-sm w-full"
            type="text"
            placeholder="Search Medium"
          />
        </div>
      </div>
  </Modal>
  )
}
