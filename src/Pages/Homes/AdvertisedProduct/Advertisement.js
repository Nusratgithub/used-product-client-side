import React from 'react';
import { Link } from 'react-router-dom'

const Advertisement = ({ product }) => {
  const { image, name, isAdvertise } = product

  return (
    <Link to='/products'>
      <div className='bg-white p-5 flex flex-col justify-between rounded-md'>
        <div className='relative'>
          <div className='group block overflow-hidden mb-5 cursor-pointer'>
            <img src={image} className='h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-105 z-10' alt="" />
            <div className={`capitalize absolute bg-orange-600 top-2 right-3 py-1 px-2 text-xs text-white font-bold rounded-full`}>{isAdvertise ? 'Advertise' : 'Sale'}</div>
          </div>
          <h3 className='text-theme-text font-poppins font-semibold text-lg leading-6 mb-1'>{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Advertisement;