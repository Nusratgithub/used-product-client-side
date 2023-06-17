import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="container mx-auto mb-20 px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row">
        <div className='w-full relative'>
          <img src='https://www.oka.com/media/TABLES.jpg' className="w-full h-[500px] rounded-lg shadow-2xl" alt='' />
        </div>
        <div className='lg:ml-10 my-auto'>
          <h1 className="text-3xl font-bold mb-2">Find your dream furniture on the leading marketplace for luxury shops</h1>
          <p className="text-xl py-4">Globally streamline fully researched total linkage for wireless materials. Quickly myocardinate market positioning ideas after maintainable models. Distinctively exploit.</p>
          <Link to='/category'>
            <button className="border p-2 rounded font-semibold hover:text-white  mt-2 text-orange-600 hover:bg-orange-600  border-orange-600">Get More Product</button></Link>
        </div>
      </div>
    </section>
  );
};

export default About;