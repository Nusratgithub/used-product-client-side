import React from 'react';
import ag from '../../../assets/images/sv-authenticity-guarantee.svg'
import mbg from '../../../assets/images/sv-money-back-guarantee.svg'
import delivery from '../../../assets/images/sv-safe-delivery.svg'

const buyerProtection = [
  {
    name: 'Authenticity Guarantee',
    details: "We require our dealers to exclusively list authentic watches. If you have any doubts about your watch's authenticity, you have 14 days to report your suspicions to the Chrono24 support team and receive your money back.",
    image: ag
  },
  {
    name: 'Global money-back guarantee',
    details: "If the watch arrives and is defective or not as the seller described, you have 14 days to initiate a return and receive your money back.",
    image: mbg
  },
  {
    name: 'Insured Shipments',
    details: "Dealers ship every order fully insured, so you can make both domestic and international purchases risk-free.",
    image: delivery
  }
]

const BuyerProtection = () => {
  return (
    <section className='px-4 md:px-0 py-16'>
      <div className='container mx-auto'>
        <h2 className="text-center font-poppins text-theme-text font-bold text-[26px] md:text-4xl leading-10 mb-[72px]">The Safest Way to Purchase Your Furniture</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
            buyerProtection.map((item, i) => (
              <div key={i} className='text-center flex flex-col items-center border border-gray-200 py-8 px-3 rounded-lg' data-aos='fade-up' data-aos-duration='1000'>
                <img className='mb-3' src={item.image} alt="" />
                <h3 className='font-bold text-xl leading-8 mb-2'>{item.name}</h3>
                <p className='text-base'>{item.details}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default BuyerProtection;