import React from 'react';
import { Link } from 'react-router-dom';


const Certificates = () => {
  return (
    <>
   <body  className='bg-gradient-to-b from-red-200 to-red-50 grid pb-10 h-auto'>
<div className='text-center mt-6'>
    <Link to="/" className=" mx-2
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Home</Link>
     <Link to="/projects" className=" mx-2
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Projects</Link>
     <Link to="/contactMe" className=" mx-2
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Contact Me</Link>
    </div>



    <div className='grid grid-cols-2 p-5 mx-5 ml-0  gap-5 mt-10 lg:px-36 lg:gap-20'>


      <div className='m-2
      bg-red-100 px-4 pt-5 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://drive.google.com/file/d/1XRDk4eLW4SNlkOHXrlEOSf_DZIfOqTIR/view?usp=sharing' target="_blank" rel="noreferrer" >
        <img src={require("./UM.png")} alt='little-limon'
        className='w-full ' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono mt-2'>University of michigan</h1> </a> 
      </div>


    <div className='m-2
    bg-red-100 px-4 pt-5 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://drive.google.com/file/d/1PKhn07vkNtn5Xp-nuFimJPLd1mhNS4iQ/view?usp=sharing' target="_blank" rel="noreferrer" >
        <img src={require("./meta.png")} alt='little-limon'
        className='w-full' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono pt-5'>Meta</h1> </a>
      </div>


      <div className='m-2
    bg-red-100 px-4 pt-5 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://drive.google.com/file/d/1WJAh6iUKVRODZAuSI1FgwjbV3_3qUmW6/view?usp=sharing' target="_blank" rel="noreferrer">
        <img src={require("./solo.png")} alt='little-limon'
        className='w-full mb-5' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono mt-2'>Solo Learn</h1> </a>
      </div>


      <div className=' m-2
    bg-red-100 px-4 pt-5 hover:bg-red-50 text-center rounded-3xl'>
        <a href='https://drive.google.com/file/d/1fO1hOcKJyqKx8JxmjDrjlYYpL20pNvE6/view?usp=sharing' target="_blank" rel="noreferrer" >
        <img src={require("./fwd.png")} alt='little-limon'
        className='w-full mb-5' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono mt-2'>Fwd</h1> </a>
      </div>


      <div className='mx-28 w-auto col-span-2  lg:mx-64
    bg-red-100 px-4 pt-4 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://drive.google.com/file/d/1Oo2Nh3KypxGQkp8gQWk8w_kZLFXGuXWQ/view?usp=sharing' target="_blank" rel="noreferrer" >
        <img src={require("./codecdmy.png")} alt='little-limon'
        className='w-full mb-4' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono mt-2'>CodeCademy</h1> </a>
      </div>
      </div>
    </body>
    </>
    );
};

export default Certificates