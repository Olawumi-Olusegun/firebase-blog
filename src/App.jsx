import { Routes, Route, } from 'react-router-dom';
import { Demo, Home } from './pages';
import HomeHeader from './components/HomeHeader';
import DemoHeader from './components/DemoHeader';

function App() {

  const auth = false;

  return (
    <>
      { auth ? <HomeHeader /> : <DemoHeader /> }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/demo' element={<Demo />} />
      </Routes>
    </>
  )
}

export default App
