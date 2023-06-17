import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'

const DashboardTopHeader = () => {
  return (
    <header className='bg-white px-2 md:px-10 py-4 sticky top-0'>
      <div className='flex justify-between items-center'>
        <fieldset className="w-full space-y-1">
          <label htmlFor="Search" className="hidden">Search</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 ">
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input type="search" name="Search" placeholder="Search..." className="border w-64 lg:w-5/12 border-gray-200 py-2 pl-10 pr-5 focus:outline-none text-theme-text" autoComplete="off" />
          </div>
        </fieldset>
        <label htmlFor="dashboardDrawer" className="cursor-pointer block lg:hidden">
          <GiHamburgerMenu className='text-xl cursor-pointer' />
        </label>
      </div>
    </header>
  );
};

export default DashboardTopHeader;