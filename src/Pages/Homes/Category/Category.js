import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductBookModal from '../../Products/ProductBookModal';
import ReportProductModal from '../../Products/ReportProductModal';
import Product from '../../Products/Product';

const Category = () => {
  const [productData, setProductData] = useState([])
  const [reportProduct, setReportProduct] = useState([])
  const categoriesData = useLoaderData()
  // console.log(categoriesData.data);
  // console.log(reportProduct);
  return (
    <section className='container mx-auto bg-gray-100 px-6 py-16'>
      <div className=''>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
            categoriesData.data?.map(product =>
              <Product
                key={product._id}
                product={product}
              />  
            )
          }
        </div>
      </div>

      {   productData &&
          <ProductBookModal
          productData={productData}
          setProductData={setProductData}
        />
      }
      {
        reportProduct &&
        <ReportProductModal
          reportProduct={reportProduct}
          setReportProduct={setReportProduct}
        />
      }
    </section>
  );
};

export default Category;