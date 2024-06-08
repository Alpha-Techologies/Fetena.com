const Pricing = () => {
  return (
    <div class=''>
      <div>
        <h2 class='text-3xl font-bold tracki text-center mt-12 sm:text-5xl '>
          Subscription
        </h2>
        <p class='max-w-3xl mx-auto mt-4 text-xl text-center '>
          You are currently on our free plan. You have{" "}
          <span className='text-primary-500 text-3xl'>30</span> days left.
        </p>
      </div>
      <div class='flex flex-wrap gap-4 items-center justify-center my-8'>
        <div class='relative p-8 min-w-64 border border-gray-200 rounded-2xl shadow-sm flex flex-col'>
          <div class='flex-1'>
            <h3 class='text-xl font-semibold '>Free</h3>
            <p class='mt-4 flex flex-col items-center '>
              <span class='text-5xl font-extrabold tracking-tight'>ETB 0</span>
              <span class='ml-1 text-xl font-semibold'>/month</span>
            </p>
            <p class='mt-6 '>You just want to discover</p>
            {/* <ul
              role='list'
              class='mt-6 space-y-6'>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>AI Monitoring</span>
              </li>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>Exam Generation</span>
              </li>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>Quizz (1 credits) </span>
              </li>
            </ul> */}
          </div>
          <a class='bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-white mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'>
            Current Plan
          </a>
        </div>
        <div class='relative p-8 min-w-64  border border-gray-200 rounded-2xl shadow-sm flex flex-col'>
          <div class='flex-1'>
            <h3 class='text-xl font-semibold '>Pro</h3>
            <p class='absolute top-0 py-1.5 px-4 bg-primary-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2'>
              Most popular
            </p>
            <p class='mt-4 flex flex-col items-baseline '>
              <span class='text-5xl font-extrabold tracking-tight'>
                ETB 9,999.99
              </span>
              <span class='ml-1 text-xl font-semibold'>/month</span>
            </p>
            <p class='mt-6 '>
              A license for your school or university - save 25%
            </p>
            {/* <ul
              role='list'
              class='mt-6 space-y-6'>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>30 credits</span>
              </li>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>Powered by GPT-4 (more accurate)</span>
              </li>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>Generate video (2 credits)</span>
              </li>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>Quizz (1 credits) </span>
              </li>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>Analytics on the quizz</span>
              </li>
            </ul> */}
          </div>
          <a
            class='bg-primary-500 text-white hover:text-white hover:bg-primary-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
            href='/auth/login'>
            Buy Now
          </a>
        </div>
        <div class='relative p-8 min-w-64 border border-gray-200 rounded-2xl shadow-sm flex flex-col'>
          <div class='flex-1'>
            <h3 class='text-xl font-semibold '>Monthly Plan</h3>
            <p class='mt-4 flex flex-col items-baseline '>
              <span class='text-5xl font-extrabold tracking-tight'>
                ETB 999.99
              </span>
              <span class='ml-1 text-xl font-semibold'>/month</span>
            </p>
            <p class='mt-6 '>A license for your school or university</p>
            {/* <ul
              role='list'
              class='mt-6 space-y-6'>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>10 Credits</span>
              </li>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>Generate video (2 credits)</span>
              </li>
              <li class='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span class='ml-3 '>Quizz (1 credits) </span>
              </li>
            </ul> */}
          </div>
          <a class='bg-primary-50 text-primary-700 hover:text-white hover:bg-primary-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'>
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
export default Pricing


