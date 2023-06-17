import React from 'react';
import img1 from '../../../assets/images/banner1.jpg'
import img2 from '../../../assets/images/banner2.jpg'
import img3 from '../../../assets/images/banner3.webp'
import BannerItem from './BannerItem';
import './BannerItem.css'

const bannerData = [
  {
    image: img1,
    prev: 3,
    id: 1,
    next:2
  },
  {
    image: img2,
    prev: 1,
    id: 2,
    next:3
  },
  {
    image: img3,
    prev: 2,
    id: 3,
    next:1
  },

]

const Banner = () => {
  return (
    <div className="container mx-auto carousel w-full pb-10">
      {
        bannerData.map(slide => <BannerItem
          key={slide.id}
          slide={slide}
        ></BannerItem>)
      }
    </div>
  );
};

export default Banner;