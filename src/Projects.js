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
     <Link to="/contactMe" className="
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Contact Me</Link>
    </div>

    <div className='grid grid-cols-2 p-5 mx-8 ml-0  gap-8 mt-10 lg:px-36 lg:gap-20'>

      <div className='p-4
      bg-red-100 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://little-limon.vercel.app/' target='_blank' rel="noreferrer" >
        <img src={littlelimon} alt='little-limon'
        className='w-full' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono py-3'>Little Limon Resturant</h1> 
        <p className='font-serif text-slate-800'> a capstone project guided by Meta Front end web developer, a simple Resturant's website including reservation page </p> </a>
      </div>

    <div className='
    bg-red-100 p-4 hover:bg-red-50 text-center rounded-3xl'>
        <a href='https://todobyradwa-j8qudojxy-radwaa24.vercel.app/'target='_blank' rel="noreferrer" >
        <img src={todo} alt='todo'
        className='w-full ' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono py-3'> TODO List APP </h1> 
        <p className='font-serif text-slate-800'> A simple App to manage daily tasks by adding items to do and complete or remove them and also disply both .</p> </a>  
      </div>

      <div className='mx-20 block w-auto col-span-2  lg:mx-64
    bg-red-100 hover:bg-red-50 text-center rounded-3xl'>
        <a href='https://calcbyradwa.vercel.app/' target='_blank' rel="noreferrer">
        <img src={calc} alt='calculator'
        className='w-full ' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono py-5'> Basic calculator </h1>
        <p className='font-serif text-slate-800'> Using React hooks and events .</p> </a>
      </div>
      </div>
    </div>
    </body>
    </>
  );
};

export default Projects