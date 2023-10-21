import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import personal from './assets/personal.png';




export default function Home() {



  return (
    <>
   
    <body className=" w-full bg-red-200 justify-center h-screen">
    <header className="w-full">
    <div className='text-center py-10
    bg-gradient-to-t from-red-200 to-red-100'>
          <Link className='mx-3 p-2 
           bg-red-50 text-gray-700 hover:bg-gradient-to-r from-gray-100 to-red-200  rounded-md  font-medium'
          to="/certificates" >Certificates</Link>
          <Link className='mr-2 p-2 bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-200 rounded-md  font-medium'
           to="/projects" >Projects</Link>
          <Link className=' mr-1 p-2 bg-red-50 text-gray-700 hover:bg-gradient-to-l from-gray-100 to-red-200 rounded-md  font-medium'
          to="/contactMe" >Contact</Link>
    </div>
    </header>


        <section>
         <div className="flex flex-col mt-10 justify-center items-center mx-auto my-auto">
            <div className="my-5 w-64 h-64 hover:animate-bounce overflow-hidden rounded-full block">
            <img src={personal}
            className=' object-cover  object-center w-full h-full' alt="radwa" /> 
            </div>
            <h1 className=" font-bold text-4xl text-gray-900">Radwa Khalaf</h1>
            <h1 className=" font-bold text-3xl mt-1"> Front-End Web Developer</h1>
            <h2 className="text-center font-medium text-md px-4 pt-6">Passionate about making a good design and improving accessibility using the power of react and Vue for a great user experience</h2>

          </div>
        
          <div>
          <div className='flex justify-end'>
   
  </div>
        
          </div>

          <div className="flex gap-6 mt-8 justify-center">
    <a href='https://github.com/radwaa24' target="blank" >
            <FaGithub className=" cursor-pointer text-slate-800 text-2xl hover:text-slate-700" />
            </a>
             <a href='https://www.linkedin.com/in/radwa-khalaf/' target="blank" >
            <FaLinkedin className=" cursor-pointer text-slate-800 text-2xl hover:text-slate-700" />
            </a>
    </div>
          <div className='text-center mt-8'>
          <a className="px-14 bg-gradient-to-b from-red-100  to-gray-50 hover:bg-gradient-to-t from-gray-100 to-red-50 px-4 py-2 rounded-md font-semibold text-lg"
            href="https://drive.google.com/file/d/15y4FjraiEjptd_7UvlNuo32eiy3tYEgH/view?usp=share_link" target="blank" >Resume</a>
          </div>
        </section>

    </body>

      
    </>
  );
}
