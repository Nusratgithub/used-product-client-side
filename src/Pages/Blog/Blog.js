import React from 'react';

const Blog = () => {
  return (
    <div className='bg-theme-secondary'>
      <div className="container mx-auto space-y-4 py-10 px-4 md:px-0">
        <details className="group border-l-4 border-theme-primary bg-gray-50 p-6" open >
          <summary className="flex cursor-pointer items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              What are the different ways to manage a state in a React application?
            </h2>

            <span
              className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 mb-3">
            In React apps, there are at least seven ways to handle the state. Let us briefly explore a few of them in this part.
          </p>
          <p>We can use URL to store some data e.g.</p>
          <ul className='list-disc pl-10 pt-3'>
            <li>The id of the current item, being viewed</li>
            <li>Filter parameters</li>
            <li>Pagination offset and limit</li>
            <li>Sorting data</li>
          </ul>
          <div className='space-y-3 mt-5'>
            <p>Keeping such data in the URL allows users to share deep links with others.</p>
            <p>It is recommended to avoid storing such information in the app’s state to avoid the URL in our app getting out of sync. The URL should be used as the system of record, Read from it as needed for information related to sorting, pagination, etc. Update the URL as required when the settings change</p>
            <p>React Router is a great tool to handle routes and manage the params.</p>
          </div>
          <div className='my-5'>
            Web Storage - The second option is to store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies.
          </div>
          <div className='mb-5'>
            Local State - The third option is to use store state locally. It is useful when one component needs the state. Examples include a toggle button, a form, etc.
          </div>
          <div className='mb-5'>
            Lifted State - The Fourth option is to define the state in the parent component. Often, the same state is used across multiple components. In those cases, it is useful to lift the state to a common parent. The lifting state is a two‑step process. First, we declare the state in a common parent component, and then we pass the state down to child components via props. This pattern should be considered any time a few related components need to use the same state. The lifting state avoids duplicating states in multiple components. It helps to assure that our components all consistently reflect the same state.
          </div>
          <div className='mb-5'>
            Derived State - The fifth option is to compute the new state based on the available state and we do not need to declare a state at all. If there are existing values that can be composed to give us the information we need, then we can calculate that information on each render instead of storing it. Some examples include calling .length on an array to determine the number of records instead of storing a separate numItems variable in the state or deriving an errorsExist boolean by checking if the errors array is empty.
          </div>
        </details>

        <details className="group border-l-4 border-theme-primary bg-gray-50 p-6">
          <summary className="flex cursor-pointer items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              How does prototypical inheritance work?
            </h2>

            <span
              className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 mb-4">
            Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__
          </p>
          <img src="https://media.geeksforgeeks.org/wp-content/uploads/20200520193336/Untitled-Diagram108.png" alt="" />
        </details>
        <details className="group border-l-4 border-theme-primary bg-gray-50 p-6">
          <summary className="flex cursor-pointer items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              What is a unit test? Why should we write unit tests?
            </h2>

            <span
              className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 mb-4">
            <span className='font-bold'>What is Unit Testing?</span> Unit testing, a testing technique using which individual modules are tested to determine if there are any issues by the developer himself. It is concerned with functional correctness of the standalone modules. The main aim is to isolate each unit of the system to identify, analyze and fix the defects.
          </p>
          <p>Unit testing is a powerful tool for software quality -- and has been for decades. Unit tests provide a fundamental check that an application meets its software design specifications and behaves as intended.</p>
          <p className='mt-5'>When done well, unit tests:</p>
          <ul className='list-disc pl-10 pt-3'>
            <li>decrease defects and expose them early in the development lifecycle;</li>
            <li>increase code readability;</li>
            <li>enable code reuse; and</li>
            <li>improve deployment velocity.</li>
          </ul>
        </details>
        <details className="group border-l-4 border-theme-primary bg-gray-50 p-6">
          <summary className="flex cursor-pointer items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              React vs. Angular vs. Vue?
            </h2>

            <span
              className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 mb-4"><span className='font-bold'>Angular</span> -  has a steep learning curve, considering it is a complete solution, and mastering Angular requires you to learn associated concepts like TypeScript and MVC. Even though it takes time to learn Angular, the investment pays dividends in terms of understanding how the front end works.</p>
          <p className="mt-4 leading-relaxed text-gray-700 mb-4"><span className='font-bold'>React</span> - offers a Getting Started guide that should help one set up React in about an hour. The documentation is thorough and complete, with solutions to common issues already present on Stack Overflow. React is not a complete framework and advanced features require the use of third-party libraries. This makes the learning curve of the core framework not so steep but depends on the path you take with additional functionality. However, learning to use React does not necessarily mean that you are using the best practices.</p>
          <p className="mt-4 leading-relaxed text-gray-700 mb-4"><span className='font-bold'>Vue</span>Vue - provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option. However, simplicity and flexibility of Vue is a double-edged sword — it allows poor code, making it difficult to debug and test.</p>
        </details>
      </div>
    </div>

  );
};

export default Blog;