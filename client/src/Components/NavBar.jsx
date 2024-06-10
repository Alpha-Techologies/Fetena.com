// React Related Imports
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate";

// Components Imports
import Button from './Button'

// Resources Imports
import { Icon } from "@iconify/react";
import fetena_logo from "../assets/fetena_logo.png"
import Hamburger from "hamburger-react"

const NavBar = ({displayPage, setDisplayPage}) => {

  const [isOpen, setOpen] = useState(false)

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrolled(scrollTop > 0);
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 ${
      isScrolled
        ? "bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-sm bg-[#F9FAFB]"
        : ""
    }`}>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>

        <img
                        onClick={() => setDisplayPage('home')}

          src={fetena_logo}
          className='h-8 cursor-pointer'
          alt='Fetena.com Logo'
        />
        <div className='flex items-center md:order-2 space-x-3 md:space-x-0 '>
          <div className="-mr-4 hidden lg:flex">

        <GoogleTranslate />
          </div>
          <Link to='/sign-in'>
            <Button text='Get started' />
          </Link>
          
          <div className='md:hidden'>
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
            />
          </div>
        </div>
        <div
          className={` ${
            isOpen ? "block" : "hidden"
          } items-center justify-between  w-full md:flex md:w-auto md:order-1`}>
          <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg lg:bg-transparent md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white '>
            <li>
              <a
                onClick={() => setDisplayPage('home')}
                href='#'
                className='block py-2 px-3 text-white bg-primary-500 rounded md:bg-transparent md:text-primary-500 md:p-0 md:dark:text-primary-500'>
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => setDisplayPage('home')}
                href='#how-it-works'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-500 md:p-0 '>
                How It Works
              </a>
            </li>
            <li>
              <a
                onClick={() => setDisplayPage('customers')}
                href="#"
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-500 md:p-0 '>
                Customers
              </a>
            </li>
            <li>
              <a
                onClick={() => setDisplayPage('about')}
                href="#"
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
