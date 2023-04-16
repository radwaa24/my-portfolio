import './index.css';
import Home from "./Home"
import { Route, Routes } from 'react-router-dom';
import Projects from './Projects';
import Certificates from './Certificates';
import ContactMe from './ContactMe';
function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/projects' element={<Projects />} />
    <Route path='/certificates' element={<Certificates />} />
    <Route path='/contactMe' element={<ContactMe />} />
    </Routes>
    </>
  );
}

export default App;
