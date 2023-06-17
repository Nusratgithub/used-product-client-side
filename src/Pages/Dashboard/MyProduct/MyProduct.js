import React, { useState } from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { useEffect } from 'react';
import axios from 'axios';


const MyOrder = () => {
  const { user, isLoading, logOut } = useContext(AuthContext)
  const [allProducts, setAllProducts] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState(null)

  useEffect(() => {
    fetch(`https://b612-used-products-resale-server-side-zeta.vercel.app/products?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          return logOut()
        }
        return res.json()
      })
      .then(data => {
        setAllProducts(data.data)
      })
  }, [user?.email, logOut])

  if (isLoading) {
    return <LoadingSpinner />
  }

  const closeModal = () => {
    setDeletedProduct(null)
  }
  const handleProductDelete = id => {
    fetch(`https://b612-used-products-resale-server-side-zeta.vercel.app/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.deletedCount > 0) {
          alert('deleted successfully');
          const remaining = allProducts.filter(product => product._id !== id);
          setAllProducts(remaining);
        }
      })
  }




  return (
    <section className="container mx-auto">
      <div className="">
        <h3 className='text-3xl mb-4 font-semibold'>You have {allProducts.length} product</h3>
        <div className="overflow-x-auto w-full">
          {
            allProducts?.length ?
              <table className="table  w-full" data-aos='fade-up' data-aos-duration='1000'>
                <thead>
                  <tr>
                    <th> Image </th>
                    <th> product Details</th>
                    <th> product price</th>
                    <th> status </th>
                    <th>advertised</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    allProducts?.map(product => (
                      <tr key={product._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img className="w-full h-full rounded-full" src={product.image} alt="" />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">name: {product.name}</p>
                          <p className="text-gray-900 whitespace-no-wrap">Category: {product.category}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">Resale price: ${product.resalePrice}</p>
                          <p className="text-gray-900 whitespace-no-wrap">Original price: ${product.originalPrice}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-center">
                          {
                            product.status === 'sold' ?
                              <span className="capitalize bg-gray-400 py-1 px-3 text-xs text-white font-bold rounded-full">Sold</span>
                              :
                              <span className="capitalize cursor-pointer bg-green-600 py-1 px-3 text-xs text-white font-bold rounded-full">Available</span>
                          }
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-center">
                          {
                            product.status ?
                              <span className="cursor-pointer bg-green-600 py-1 px-3 text-xs text-white font-bold rounded-full">sale</span>
                              :
                              <span className="cursor-pointer bg-orange-600 py-1 px-3 text-xs text-white font-bold rounded-full" >Advertise</span>
                          }
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <label onClick={() => setDeletedProduct(product)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
                        </td>

                      </tr>
                    ))
                  }

                </tbody>
              </table>
              :
              <div className='w-full text-center h-[300px] lg:h-[500px] flex items-center justify-center text-4xl text-gray-300'>You currently have no orders.</div>
          }
        </div>
      </div>
      {
        deletedProduct &&
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletedProduct.productName}. It cannot be undone!`}
          closeModal={closeModal}
          successAction={handleProductDelete}
          successButtonName={`Delete`}
          modalData={deletedProduct}
        />
      }


    </section>
  );
};

export default MyOrder;