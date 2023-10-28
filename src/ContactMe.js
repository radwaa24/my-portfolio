import {React, useState, useRef }  from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';



const ContactMe = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    emailjs.sendForm('service_4azp8xn', 'template_p84qhhe', form.current, '2_e8szwnxURSDMqT_')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <>
<div className='bg-gradient-to-b from-red-200 to-red-50 grid py-10 md:min-h-screen min-h-screen'>
<div className='text-center mt-6'>
    <Link to="/" className=" mx-2
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Home</Link>
     <Link to="/projects" className=" mx-2
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Projects</Link>
     <Link to="/certificates" className=" mx-2
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
    >Certificates</Link>
    </div>

      <div className="mx-auto max-w-2xl text-center mt-10 pt-3">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Me</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Will get back to you as soon as possible .
        </p>
      </div>

      <form action="#" method="POST" ref={form} onSubmit={sendEmail}
       className="grid max-w-xl w-full px-14 mx-auto mt-14">
        <div className="grid gap-y-6 ">

          <div>
            <label htmlFor="user_name" className="block text-sm font-semibold leading-6 text-gray-900">            </label>
              <input
                type="text" required
                name="user_name"
                id="user_name"
                placeholder="Full Name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
            </div>
          <div>
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              
            </label>
           
              <input
                type="text" required
                name="company"
                id="company"
                placeholder='Company'
                autoComplete="organization"
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
            </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              
            </label>
           
              <input
                type="email" required
                name="email"
                id="email"
                placeholder='Email'
                autoComplete="email"
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
            </div>


          <div>
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              
            </label>
           
              <input
                type="number"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                placeholder='Phone number'
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              
            </label>
           
              <textarea
                name="message" required
                id="message"
                rows={4}
                placeholder='Message'
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className=" bg-slate-800 hover:bg-slate-900 w-full rounded-md py-2 text-center font-semibold text-white" >
            Let's talk
          </button>
        </div>
        {isSubmitted ? (
  <div className="alert alert-success pt-2 text-slate-800" >Your message was sent successfully!</div>
) : null}

      </form>
    </div>
    </>

  );
};

export default ContactMe