import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { MdLocationPin, MdOutlineReport, MdVerified } from 'react-icons/md';
import { format, formatDistanceToNow } from 'date-fns';
import useAdmin from '../../Hooks/useAdmin';
import useSeller from '../../Hooks/useSeller';

const Product = ({ product, setProductData, setReportProduct }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)
  const [isSeller] = useSeller(user?.email)
  const { image,sellerName,verify,name,category,location,originalPrice,resalePrice,yearsOfUse,quality,isAdvertise} = product;
  // const productAddedTime = formatDistanceToNow(
  //   new Date(),
  //   { includeSeconds: true }
  // )
  
  return (
    <div className='bg-white p-5 flex flex-col justify-between rounded-sm' data-aos='fade-up' data-aos-duration='1000'>
      <div className='relative mb-5'>
        <div className='group block overflow-hidden mb-5 cursor-pointer'>
          <img src={image} className='h-[300px] w-full object-cover' alt="" />
          <div className={`capitalize absolute bg-orange-600 top-2 right-3 py-1 px-2 text-xs text-white rounded-full`}>{isAdvertise ? 'Advertise' : 'Sale'}</div>
        </div>
        <h3 className='text-theme-text font-poppins font-semibold text-lg leading-6 mb-1'>{name}</h3>
        <div className='flex justify-between items-center'>
          <div className='flex gap-1'>
            <div className='text-sm hover:underline text-gray-400 flex items-center gap-[2px]'>
              {sellerName}
              <div className="tooltip" data-tip={`${verify ? 'Verified' : 'Unverified'}`}>
                <MdVerified className={`${verify ? 'text-[#3F8DF3]' : 'text-gray-400'}`} />
              </div>
            </div>
            {/* <div className="tooltip tooltip-bottom " data-tip={format(new Date(), 'PPPPp')}>
              <span className='text-sm text-gray-400 cursor-pointer hover:underline'>{productAddedTime}</span>
            </div> */}
          </div>
          <div className='text-sm text-theme-body flex items-center gap-[2px]'>
            <MdLocationPin className='text-gray-400' />
            {location}
          </div>
        </div>
        <p className='text-gray-400 b-5 text-sm mb-5'>Brand: {category}</p>
        <div className='flex items-end gap-1 justify-start'>
          <p className='text-orange-600 text-lg leading-4 font-medium mb-2'>৳ {resalePrice}</p>
          <p className='text-gray-400 line-through text-xs leading-4 font-medium mb-1'>৳ {originalPrice}</p>
        </div>
        <p className='capitalize text-gray-400 text-[13px]'>Uses: {yearsOfUse} </p>
        <p className='capitalize text-gray-400 text-[13px]'>Quality: {quality }</p>
      </div>
      <div className='flex justify-between items-center'>
        {
          !isAdmin && !isSeller ?
            <label
              htmlFor="booking-modal"
              onClick={() => setProductData(product) }
              className="cursor-pointer flex text-xs border px-3 my-auto py-2 border-orange-600 group hover:bg-orange-600 rounded-xs transition-all duration-200"
            >
              <div className="text-xs text-orange-600 font-semibold ml-2
                            group-hover:text-white delay-100">
                Book Now
              </div>
            </label>
            :
            <button
              
              className="text-xs px-3 my-auto py-2 bg-orange-600 text-white"
            >
              Book Now
            </button>
        }
        <div className='flex items-center gap-2 text-xl'>
          <button
            type="button"
            className="text-2xl border p-[6px] rounded-full border-gray-300 text-orange-600 hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-200 delay-100 tooltip"
            data-tip="Wishlist"
          >
            <span className="sr-only">Wishlist</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
          <label
            htmlFor="reportProduct-modal"
            className='border p-1 cursor-pointer rounded-full border-gray-300 text-orange-600 hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-200 delay-100 tooltip'
            data-tip="Report"
            onClick={() => setReportProduct(product)}
          >
            <MdOutlineReport />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Product;