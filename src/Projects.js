import React from 'react';
import { Link } from 'react-router-dom';
import todo from './todo.png';
import calc from './calc.png' ;
import littlelimon from './littlelimon.png';



const Projects = () => {
  return (
    <>
    <body>
      <div className='bg-gradient-to-b from-red-200 to-red-50 grid h-auto pb-20'>
<div className='text-center mt-6'>
    <Link to="/" className="
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium" 
    >Home</Link>
    <Link to="/certificates" className=" mx-2
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Certificates</Link>
     <Link to="/contactMe" className=" mx-2
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Contact Me</Link>
    </div>

    <div className='grid grid-cols-3 lg:px-10 mt-16'>

      <article className='grid lg:ml-20 w-full p-4 ml-10
      bg-red-100 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://little-limon.vercel.app/' target='_blank' rel="noreferrer" >
        <img src={littlelimon} alt='little-limon'
        className='' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono'>Little Limon Resturant</h1> 
        <p className='font-serif text-slate-800'> a capstone project guided by Meta Front end developer , using React.JS and other UI frame works for a simple Resturant's website including reservation page .</p> </a>
      </article>

    <article className='grid col-start-3 justify-self-end lg:mr-20 w-full mr-10
    bg-red-100 p-4 hover:bg-red-50 text-center rounded-3xl'>
        <a href='https://todobyradwa-j8qudojxy-radwaa24.vercel.app/'target='_blank' rel="noreferrer" >
        <img src={todo} alt='todo'
        className='w-full ' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono'> TODO List APP </h1> 
        <p className='font-serif text-slate-800'> A simple App to manage daily tasks by adding items to do and complete or remove them and also disply both using only CSS for styling .</p> </a>  
      </article>

      <article className=' mx-20 col-span-3 justify-self-center items-center lg:mx-96 mt-8
    bg-red-100 p-5 hover:bg-red-50 text-center rounded-3xl'>
        <a href='https://calcbyradwa.vercel.app/' target='_blank' rel="noreferrer">
        <img src={calc} alt='calculator'
        className='w-full ' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono py-5'> Basic calculator </h1>
        <p className='font-serif text-slate-800'> Using React hooks and events .</p> </a>
      </article>
      </div>
    </div>
    </body>
    </>
  );
};

export default Projects