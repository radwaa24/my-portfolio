import React from 'react';
import { Link } from 'react-router-dom';



const Projects = () => {
  return (
    <>
    <body>
      <div className='bg-gradient-to-b from-red-200 to-red-50 grid p-5'>
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




    <div className='grid grid-rows-2 grid-flow-col lg:px-10 lg:gap-20'>
      <article className='grid row-span-2 mx-5 lg:m-10
      bg-red-100 p-3 hover:bg-red-50 text-center rounded-3xl'>

        <img src={require("./screen1.png")} alt='little-limon'
        className='w-full' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono'>Little Limon Resturant</h1> 
        <p className='font-serif text-slate-800'> a capstone project guided by Meta Front end developer , using React.JS and other UI frame works for a simple Resturant's website including reservation page .</p>
      </article>

    <article className='grid row-span-2 mx-5 lg:m-10
    bg-red-100 p-3 hover:bg-red-50 text-center rounded-3xl'>

        <img src={require("./screen1.png")} alt='little-limon'
        className='w-full' />
        <h1 className='font-bold font-serif text-slate-800 hover:font-mono'> Little Limon Resturant</h1> 
        <p className='font-serif text-slate-800'> a capstone project guided by Meta Front end developer , using React.JS and other UI frame works for a simple Resturant's website including reservation page .</p>
      </article>
      </div>
    <section>

    </section>
    <section>

    </section>
    </div>
    </body>
    </>
  )
}

export default Projects