import * as React from "react";

function NumberCircle({ number }) {
  return (
    <div className="flex justify-center items-center px-3.5 bg-blue-900 rounded-full h-[34px] w-[34px] text-white">
      {number}
    </div>
  );
}

function Connector() {
  return <div className="shrink-0 my-auto h-1.5 bg-blue-900 rounded-[40px] w-[64px]" />;
}

function ProgressBar() {
  const numbers = [1, 2, 3, 4];

  return (
    <nav className="flex gap-2 px-2 text-base font-medium leading-5 text-white whitespace-nowrap max-md:flex-wrap">
      {numbers.map((number, index) => (
        <React.Fragment key={number}>
          <NumberCircle number={number} />
          {index < numbers.length - 1 && <Connector />}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default ProgressBar;