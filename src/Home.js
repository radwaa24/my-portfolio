import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import personal from './personal.png';




export default function Home() {
  return (
    <>
    <header>
    <div className='text-center bg-gradient-to-t from-red-200 to-red-100 py-8 '>
          <Link className='mx-4 p-2 bg-red-50 text-gray-700 hover:bg-gradient-to-r from-gray-100 to-red-200  rounded-md  font-medium'
          to="/certificates" >Certificates</Link>
          <Link className='mx-4 p-2 bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-200 rounded-md  font-medium'
           to="/projects" >Projects</Link>
          <Link className='mx-4 p-2 bg-red-50 text-gray-700 hover:bg-gradient-to-l from-gray-100 to-red-200 rounded-md  font-medium'
          to="/contactMe" >Contact Me</Link>
    </div>
    </header>

      <main className='bg-red-200'>
        <section className="min-h-screen pt-10 ">
          <div>
            <div className=" w-64 h-64 overflow-hidden rounded-full mx-auto block">
            <img src={personal}
            className=' object-cover object-center w-full h-full' alt="radwa" /> 
            </div><br />
                  <h1 className=" text-center font-bold text-3xl hover:font-serif text-gray-900">Radwa Khalaf</h1>

            <h1 className="text-center font-bold text-2xl"> Front-End Web Developer</h1>
            <h2 className="text-center font-medium text-md px-4 pt-6">passionate about making a good design and improving accessibility using the power of react and the UI frame works  for a great user experience .</h2>
          </div>
          <div className="flex gap-4 mt-6 justify-center">
    <a href='https://github.com/radwaa24' target="blank" >
            <FaGithub className=" cursor-pointer text-slate-800 text-2xl hover:text-slate-700" />
            </a>
             <a href='https://www.linkedin.com/in/radwa-khalaf/' target="blank" >
            <FaLinkedin className=" cursor-pointer text-slate-800 text-2xl hover:text-slate-700" />
            </a>
    </div>
          <div className='text-center mt-8 '>
          <a className="px-14 bg-gradient-to-b from-red-100  to-gray-50 hover:bg-gradient-to-t from-gray-100 to-red-50 px-4 py-2 rounded-md font-semibold text-lg"
            href="https://drive.google.com/file/d/1XYwMMWQwwN1Ud0UfQ6znIGKJS8EURCV2/view?usp=sharing" target="blank" >Resume</a>
          </div>
        </section>
      </main>
    </>
  );
}
