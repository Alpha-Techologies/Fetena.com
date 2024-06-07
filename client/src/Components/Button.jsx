const Button = ({text}) => {
  return (
    <button
      type='button'
      className="flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-semibold py-[0.4rem] px-8 rounded-md text-md">
      {text}
    </button>
  );
}
export default Button