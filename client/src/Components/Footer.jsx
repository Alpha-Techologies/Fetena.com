import { Icon } from '@iconify/react'
import fetena_logo from '../assets/fetena_logo.png'

const Footer = () => {
  return (
    <footer className='p-4 bg-white sm:p-6 w-full border border-t-blue-100'>
      <div className='mx-auto max-w-screen-xl'>
        <div className='md:flex md:justify-between'>
          <div className='mb-6 md:mb-0 flex lg:flex-col lg:items-start sm:items-center sm:justify-start gap-4'>
            <a
              href='https://flowbite.com'
              className='flex items-center'>
              <img
                src={fetena_logo}
                className='mr-3 h-8'
                alt='Fetena.com Logo'
              />
            </a>
            <div className='flex flex-col items-start'>
              <p>
                Tel:{" "}
                <span className='font-bold text-gray-500'>
                  +254 712 345 678
                </span>
              </p>
              <p>
                Address:{" "}
                <span className='font-bold text-gray-500'>info@fetena.com</span>
              </p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase '>
                Resources
              </h2>
              <ul className='text-gray-600 '>
                <li className='mb-4'>
                  <a
                    href='https://flowbite.com'
                    className='hover:underline'>
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href='https://tailwindcss.com/'
                    className='hover:underline'>
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase '>
                Follow us
              </h2>
              <ul className='text-gray-600 '>
                <li className='mb-4'>
                  <a
                    href='https://github.com/themesberg/flowbite'
                    className='hover:underline '>
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href='https://discord.gg/4eeurUVvTy'
                    className='hover:underline'>
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase'>
                Legal
              </h2>
              <ul className='text-gray-600 '>
                <li className='mb-4'>
                  <a
                    href='#'
                    className='hover:underline'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:underline'>
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto  lg:my-8' />
        <div className='sm:flex sm:items-center sm:justify-between '>
          <span className='text-sm text-gray-500 sm:text-center '>
            ©{" "}{new Date().getFullYear()}{" "}
            <a
              href='https://flowbite.com'
              className='hover:underline'>
              Fetena.com™
            </a>
            . All Rights Reserved.
          </span>
          <div className='flex mt-4 space-x-6 sm:justify-center sm:mt-0'>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-900 '>
              <Icon
                className='w-5 h-5'
                icon='ic:baseline-facebook'
              />
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-900 '>
              <Icon
                className='w-5 h-5'
                icon='ri:instagram-fill'
              />
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-900 '>
              <Icon
                className='w-5 h-5'
                icon='entypo-social:linkedin-with-circle'
              />
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-900 '>
              <Icon
                className='w-5 h-5'
                icon='ic:baseline-telegram'
              />
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-900 '>
              <Icon
                className='w-5 h-5'
                icon='mingcute:whatsapp-fill'
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer