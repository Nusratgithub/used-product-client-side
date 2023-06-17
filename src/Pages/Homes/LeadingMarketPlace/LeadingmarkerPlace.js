import React from 'react';
import rating from '../../../assets/images/buyer-rating.svg'
import watch from '../../../assets/images/love-my-watch.svg'
import handshake from '../../../assets/images/handshake.svg'
import dealer from '../../../assets/images/dealer.svg'

const leadingMarket = [
  {
    name: '4.8 out of 5 stars',
    details: 'from 124,000 reviews worldwide',
    image: rating
  },
  {
    name: '9 million',
    details: 'watch enthusiasts use Chrono24 each month',
    image: watch
  },
  {
    name: 'Over 200,000',
    details: 'customers choose Buyer Protection annually',
    image: handshake
  },
  {
    name: 'More than 25,000',
    details: 'Trustworthy sellers',
    image: dealer
  }
]

const LeadingMarketplace = () => {
  return (
    <section className='px-4 md:px-0 py-15'>
      <div className='container mx-auto'>
        <h2 className="text-center font-poppins text-theme-text font-bold text-[26px] md:text-4xl leading-10 my-[52px]">The Leading Marketplace for Luxury Furniture Shops</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {
            leadingMarket.map((item, i) => (
              <div key={i} className='flex flex-col items-center text-center hover:shadow-shadow transition duration-200 py-8 px-5 rounded-lg' data-aos='fade-up' data-aos-duration='1000'>
                <img className='mb-5 w-20' src={item.image} alt="" />
                <h3 className='text-xl font-semibold mb-1 leading-8'>{item.name}</h3>
                <p className='text-base text-theme-body'>{item.details}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default LeadingMarketplace;