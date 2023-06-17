import React from 'react';
import About from '../About/About';
import Banner from '../Banner/Banner';
import BuyerProtection from '../BuyerProtection/BuyerProtection';
import Advertisements from '../../Homes/AdvertisedProduct/Advertisements'
import CustomerReview from '../CustomerReview/CustomerReview';
import LeadingMarketplace from '../LeadingMarketPlace/LeadingmarkerPlace';
import Categories from '../Category/Categories';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Categories />
      <Advertisements></Advertisements>
      <LeadingMarketplace/>
      <BuyerProtection></BuyerProtection>
      <CustomerReview></CustomerReview>

    </div>
  );
};

export default Home;