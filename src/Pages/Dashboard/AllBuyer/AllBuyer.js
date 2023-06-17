import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import useSetTitle from '../../../../Hooks/useSetTitle';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner.jsx';
import UserVerified from '../userVerified/userVerified';

const AllBuyersList = () => {
  // useSetTitle('All Buyers')
  const [deletedUser, setDeletedUser] = useState(null)
  const { data: buyers = [], isLoading, refetch } = useQuery({
    queryKey: ['buyers'],
    queryFn: async () => {
      const res = await fetch('https://b612-used-products-resale-server-side-blush.vercel.app/buyers', {
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // }
      })
      const data = await res.json()
      return data
    }
  })

  const allBuyers = buyers

  if (isLoading) {
    return <LoadingSpinner />
  }

  const closeModal = () => {
    setDeletedUser(null)
  }
  const handleUserVerified = email => {
    fetch(`https://b612-used-products-resale-server-side-blush.vercel.app/users/status-update/${email}`, {
      method: 'PUT',
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      // }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success(data.message, { autoClose: 400 })
          refetch()
        }
      })
  }

  const handleUserDelete = buyerId => {
    fetch(`https://b612-used-products-resale-server-side-blush.vercel.app/buyers/${buyerId}`, {
      method: "DELETE",
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success(data.message, { autoClose: 400 })
          refetch()
        }
      })
  }

  return (
    <section className="container mx-auto">
      <div className="">
        <h3 className='text-3xl mb-4 font-semibold'>You have {allBuyers.length} buyer</h3>
        <div className="overflow-x-auto w-full">
          {
            allBuyers?.length ?
              <table className="table  w-full" data-aos='fade-up' data-aos-duration='1000'>
                <thead>
                  <tr>
                    <th> Image </th>
                    <th> name</th>
                    <th> email</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    allBuyers?.map(buyer => (
                      <tr key={buyer._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img className="w-full h-full rounded-full" src={buyer.image} alt="" />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className='flex items-center gap-[2px]'>
                            <p className="text-gray-900 whitespace-no-wrap capitalize">{buyer.name}</p>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className='flex items-center gap-[2px]'>
                            <p className="text-gray-900 whitespace-no-wrap capitalize">{buyer.email}</p>
                          </div>
                        </td>



                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <label onClick={() => setDeletedUser(buyer)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
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

export default AllBuyersList;