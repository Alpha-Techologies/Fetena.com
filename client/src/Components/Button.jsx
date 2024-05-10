const Button = ({text, color, px, py, textColor}) => {
  return (
    <button
      type='button'
      className={` text-${textColor} border border-${color} bg-${color} hover:bg-white hover:text-${color} hover:border hover:border-${color} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-${px} py-${py} text-center transition-all ease-in-out duration-300 `}>
      {text}
    </button>
  );
}
export default Button