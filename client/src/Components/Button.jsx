const Button = ({text}) => {
  return (
    <button
      type='button'
      className='text-white bg-red-500 hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4  md:py-2 text-center '>
      {text}
    </button>
  );
}
export default Button