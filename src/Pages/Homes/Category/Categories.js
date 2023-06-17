import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Categories = () => {
  const [allCategory, setCategory] = useState([]);

  useEffect(() => {
    fetch('https://b612-used-products-resale-server-side-blush.vercel.app/category')
      .then(res => res.json())
      .then(data => setCategory(data)
      )
  }, [])


  return (
    <section className='px-4 md:px-0 py-5'>
      <div className='container mx-auto'>
        <h2 className="text-center font-poppins text-theme-text font-bold text-[20px] md:text-4xl leading-10 mb-[52px]">Our Furniture Category</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center'>
          {
            allCategory?.map(category => (
              <div
                key={category._id}
                className="card card-compact h-full w-100 bg-base-100 shadow-xl border">
                <Link to={`/category/${category._id}`}>
                  <div className="card-body">
                    <h2 className="text-xl font-semibold text-center">{category.category}</h2>
                    <p>
                    </p>
                  </div></Link>
              </div>
            ))
          }
        </div>

      </div>
    </section>
  );
};

export default Categories;