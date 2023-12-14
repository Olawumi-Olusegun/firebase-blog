import { Routes, Route, Navigate, } from 'react-router-dom';
import { Demo, Home, Profile, Write } from './pages';
import HomeHeader from './components/HomeHeader';
import DemoHeader from './components/DemoHeader';
import { Blog } from './context/Context';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
function App() {

  const { currentUser } = Blog();
  return (
    <>
      { currentUser ? <HomeHeader /> : <DemoHeader /> }
      <Routes>
        { currentUser && <Route path='/' element={<Home />} />}
        { !currentUser && <Route path='/demo' element={<Demo />} />}
        <Route path='/profile/:userId' element={<Profile />} />
        { currentUser && <Route path='/write' element={<Write />} />}
        <Route path="*" element={<Navigate to={!currentUser ? "/demo" : '/' } />} />
        
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
