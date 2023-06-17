import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import useSetTitle from '../../Hooks/useSetTitle';
import LoadingSpinner from '../../Pages/Shared/LoadingSpinner/LoadingSpinner'
import Product from './Product';
import ProductBookModal from './ProductBookModal';
import ReportProductModal from './ReportProductModal';

const Products = () => {
  // useSetTitle('Products')
  const [productData, setProductData] = useState(null)
  const [reportProduct, setReportProduct] = useState([])
  const [allProducts, setAllProducts] = useState([])
  // console.log(productData)

  useEffect(() => {
    fetch('https://b612-used-products-resale-server-side-blush.vercel.app/allProducts')
      .then(res => res.json())
      .then(data => setAllProducts(data.data)
      )
  }, [])

  return (
    <section className='container mx-auto px-5 bg-gray-100 py-10'>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100'>
        {
          allProducts?.length === 0 ?
            <div className='col-span-1 md:col-span-2 lg:col-span-3'>
              <div className='flex justify-center'>
                <LoadingSpinner />
              </div>
            </div>
            :
            allProducts?.map(product => (
              <Product
                key={product._id}
                product={product}
                setProductData={setProductData}
                setReportProduct={setReportProduct}
              />
            ))
        }

      </div>
      {

        productData &&
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

export default Products;