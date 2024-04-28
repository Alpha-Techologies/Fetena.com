import { Icon } from "@iconify/react";


const ExamsPage = () => {
  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex justify-between">
        <h1 className='text-3xl font-bold'>Exams List</h1>
        <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
          {" "}
          <Icon className="text-white w-4 h-4" icon='material-symbols:add' /> Create Exam
        </button>
      </div>
    </div>
  );
}
export default ExamsPage