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
<div className='bg-gradient-to-b from-red-200 to-red-50 grid p-10'>
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

      <div className="mx-auto max-w-2xl text-center mt-8 pt-3">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Me</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Will get back to you as soon as possible .
        </p>
      </div>

      <form action="#" method="POST" ref={form} onSubmit={sendEmail}
       className="grid mx-20  lg:px-72 mt-14 h-fit">
        <div className="grid grid-cols-1 gap-y-6 gap-x-8">

          <div className="sm:col-span-2">
            <label htmlFor="user_name" className="block text-sm font-semibold leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2.5">
              <input
                type="text" required
                name="user_name"
                id="user_name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              Company
            </label>
            <div className="mt-2.5">
              <input
                type="text" required
                name="company"
                id="company"
                autoComplete="organization"
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email" required
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Phone number
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
              </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message" required
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
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