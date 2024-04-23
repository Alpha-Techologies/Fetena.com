const Button = ({text}) => {
  return (
    <button
      type='button'
      className=' text-white border border-primary-500 bg-primary-500 hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-8 py-2  text-center transition-all ease-in-out duration-300 '>
      {text}
    </button>
  );
}
export default Button