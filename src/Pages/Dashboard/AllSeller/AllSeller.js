import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
// import useSetTitle from '../../../../Hooks/useSetTitle';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner.jsx';
import { toast } from 'react-toastify'
// import UserVerified from '../../UserVerified/UserVerified';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import UserVerified from '../userVerified/userVerified.js';

const AllSellers = () => {
  // useSetTitle('All Sellers')
  const [deletedUser, setDeletedUser] = useState(null)
  const { data: sellers = [], isLoading, refetch } = useQuery({
    queryKey: ['sellers'],
    queryFn: async () => {
      const res = await fetch('https://b612-used-products-resale-server-side-zeta.vercel.app/sellers', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      })
      const data = await res.json()
      return data
    }
  })

  const allSellersList = sellers.data

  const closeModal = () => {
    setDeletedUser(null)
  }

  const handleUserVerified = email => {
    fetch(`https://b612-used-products-resale-server-side-zeta.vercel.app/users/status-update/${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success(data.message, { autoClose: 400 })
          refetch()
        }
      })
  }

  const handleUserDelete = sellerId => {
    fetch(`$https://b612-used-products-resale-server-side-zeta.vercel.app/sellers/${sellerId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success(data.message, { autoClose: 400 })
          refetch()
        }
      })
  }


  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <section className="container mx-auto">
      <div className="">
        <h3 className='text-3xl mb-4 font-semibold'>You have {allSellersList.length} seller</h3>
        <div className="overflow-x-auto w-full">
          {
            allSellersList?.length ?
              <table className="table  w-full" data-aos='fade-up' data-aos-duration='1000'>
                <thead>
                  <tr>
                    <th> Image </th>
                    <th> name</th>
                    <th> email</th>
                    <th> status</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    allSellersList?.map(seller => (
                      <tr key={seller._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img className="w-full h-full rounded-full" src={seller.image} alt="" />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className='flex items-center gap-[2px]'>
                            <p className="text-gray-900 whitespace-no-wrap capitalize">{seller.name}</p>
                            <UserVerified seller={seller} />
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{seller.email}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {
                            seller.verify === true ?
                              <span className='bg-success rounded-full text-white font-bold py-1 px-2'>Verified</span>
                              :
                              <span className={`relative inline-block px-3 py-1 font-semibold text-white leading-tight cursor-pointer`} onClick={() => handleUserVerified(seller.email)}>
                                <span aria-hidden className={`absolute inset-0 bg-success opacity-50 rounded-full`}></span>
                                <span className="relative">{seller.verify ? 'Verified' : 'Unverified'}</span>
                              </span>
                          }
                        </td>


                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <label onClick={() => setDeletedUser(seller)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
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
        deletedUser &&
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletedUser.name}. It cannot be undone!`}
          closeModal={closeModal}
          successAction={handleUserDelete}
          successButtonName={`Delete`}
          modalData={deletedUser}
        />
      }


    </section>
  );
};

export default AllSellers;