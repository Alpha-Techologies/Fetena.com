// React Related Imports
import { useState } from "react";

// Components Imports
import Button from './Button'

// Resources Imports
import { Icon } from "@iconify/react";
import fetena_logo from "../assets/fetena_logo.png"
import Hamburger from "hamburger-react"


const NavBar = () => {

  const [isOpen, setOpen] = useState(false)


  return (
    <nav className='bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <img
          src={fetena_logo}
          className='h-8'
          alt='Fetena.com Logo'
        />
        <div className='flex md:order-2 space-x-3 md:space-x-0 '>
          <Button text='Get started' />
          <div className='md:hidden'>
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
            />
          </div>
        </div>
        <div className={` ${isOpen ? "block" : "hidden"} items-center justify-between  w-full md:flex md:w-auto md:order-1`}>
          <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white '>
            <li>
              <a
                href='#'
                className='block py-2 px-3 text-white bg-primary-500 rounded md:bg-transparent md:text-primary-500 md:p-0 md:dark:text-primary-500'>
                Home
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-500 md:p-0 '>
                How It Works
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-500 md:p-0 '>
                Customers
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 '>
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;