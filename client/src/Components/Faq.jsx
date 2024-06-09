import React from 'react'

const Faq = () => {
  return (
    <div className="space-y-4">
    <details className="group [&_summary::-webkit-details-marker]:hidden" open>
      <summary
        className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
      >
        <h2 className="font-medium text-blue-800">What makes Fetena.com user-friendly for exam creation?</h2>
  
        <svg
          className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
  
      <p className="mt-4 px-4 leading-relaxed text-gray-700">
      Fetena.com offers an intuitive interface that simplifies the exam creation process. Educators can easily set up exams with various question types, including multiple-choice and essays, making the process quick and efficient.
      </p>
    </details>
  
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
      >
        <h2 className="font-medium text-blue-800">How does Fetena.com ensure a secure exam environment?</h2>
  
        <svg
          className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
  
      <p className="mt-4 px-4 leading-relaxed text-gray-700">
      Fetena.com employs robust security measures to prevent cheating and ensure exam integrity. Features such as real-time monitoring and secure browser settings help maintain a fair testing environment.
      </p>
    </details>

    <details className="group [&_summary::-webkit-details-marker]:hidden" open>
      <summary
        className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
      >
        <h2 className="font-medium text-blue-800">Can Fetena.com handle automated grading?</h2>
  
        <svg
          className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
  
      <p className="mt-4 px-4 leading-relaxed text-gray-700">
      Yes, Fetena.com provides automated grading tools that enable quick and accurate assessment of exams. This feature delivers instant results to students, saving time and reducing manual grading efforts for educators.
      </p>
    </details>
  
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
      >
        <h2 className="font-medium text-blue-800">What real-time monitoring capabilities does Fetena.com offer?</h2>
  
        <svg
          className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
  
      <p className="mt-4 px-4 leading-relaxed text-gray-700">
      Fetena.com includes real-time monitoring features that allow examiners to oversee the exam process as it happens. This helps ensure that all examinees follow the rules and maintains the integrity of the exam.
      </p>
    </details>
  </div>
  )
}

export default Faq;