import React from 'react';
import { Link } from 'react-router-dom';


const Certificates = () => {
  return (
  
   <body  className='bg-gradient-to-b from-red-200 to-red-50 grid py-10'>
<div className='text-center mt-6'>
    <Link to="/" className=" mx-1
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Home</Link>
     <Link to="/projects" className=" mx-1
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Projects</Link>
     <Link to="/contactMe" className=" mx-1
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Contact Me</Link>
    </div>



    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-5 mt-10'>


      <div className='m-2
      bg-red-100 px-4 pt-5 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://drive.google.com/file/d/1_vmc3MKJsdSLxMjTByYtvPPtbHv5KFZu/view?usp=sharing' target="_blank" rel="noreferrer" >
        <img src={require("./assets/UM.png")} alt='little-limon'
        className='w-full ' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono mt-2'>University of Michigan</h1> </a> 
      </div>


    <div className='m-2
    bg-red-100 px-4 pt-5 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://drive.google.com/file/d/1goUCFzpM7UPEhMVVea2gLkPOSaI-71xZ/view?usp=sharing' target="_blank" rel="noreferrer" >
        <img src={require("./assets/meta.png")} alt='little-limon'
        className='w-full' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono my-3'>Meta</h1> </a>
      </div>


      <div className='m-2
    bg-red-100 px-4 pt-5 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://drive.google.com/file/d/1WJAh6iUKVRODZAuSI1FgwjbV3_3qUmW6/view?usp=sharing' target="_blank" rel="noreferrer">
        <img src={require("./assets/solo.png")} alt='little-limon'
        className='w-full mb-5' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono mt-2'>Solo Learn</h1> </a>
      </div>


      <div className=' m-2
    bg-red-100 px-4 pt-5 hover:bg-red-50 text-center rounded-3xl'>
        <a href='https://drive.google.com/file/d/1fO1hOcKJyqKx8JxmjDrjlYYpL20pNvE6/view?usp=sharing' target="_blank" rel="noreferrer" >
        <img src={require("./assets/fwd.png")} alt='little-limon'
        className='w-full ' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono mt-4 '>FWD</h1> </a>
      </div>


      <div className='m-2
    bg-red-100 px-4 pt-5 hover:bg-red-50 text-center rounded-3xl'>
         <a href='https://drive.google.com/file/d/1Oo2Nh3KypxGQkp8gQWk8w_kZLFXGuXWQ/view?usp=sharing' target="_blank" rel="noreferrer" >
        <img src={require("./assets/codecdmy.png")} alt='little-limon'
        className='w-full ' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono my-4'>CodeCademy</h1> </a>
      </div>
      </div>
    </body>
    );
};

export default Certificates