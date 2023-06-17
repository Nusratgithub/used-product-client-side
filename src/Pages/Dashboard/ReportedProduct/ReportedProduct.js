import React, { useState } from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal'
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { useEffect } from 'react';

const MyOrder = () => {
  const { user, isLoading, logOut } = useContext(AuthContext)
  const [reports, setReports] = useState([]);
  const [deletedOrder, setDeletedOrder] = useState(null)

  useEffect(() => {
    fetch(`https://b612-used-products-resale-server-side-blush.vercel.app/reports?email=${user?.email}`, {
      // // headers: {
      // authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // // }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          return logOut()
        }
        return res.json()
      })
      .then(data => {
        setReports(data.data)
      })
  }, [user?.email, logOut])

  if (isLoading) {
    return <LoadingSpinner />
  }

  const closeModal = () => {
    setDeletedOrder(null)
  }
  const handleOrderDelete = id => {
    fetch(`https://b612-used-products-resale-server-side-blush.vercel.app/reports/${id}`, {
      method: "DELETE",
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.deletedCount > 0) {
          alert('deleted successfully');
          const remaining = reports.filter(report => report._id !== id);
          setReports(remaining);
        }
      })
  }




  return (
    <section className="container mx-auto">
      <div className="">
        <h3 className='text-3xl mb-4 font-semibold'>You have {reports.length} product</h3>
        <div className="overflow-x-auto w-full">
          {
            reports?.length ?
              <table className="table  w-full" data-aos='fade-up' data-aos-duration='1000'>
                <thead>
                  <tr>
                    <th> Image </th>
                    <th> product Details </th>
                    <th> user Details </th>
                    <th> message </th>
                    <th> Action</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    reports?.map(report => (
                      <tr key={report._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img className="w-full h-full rounded-full" src={report.image} alt="" />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">Category: {report.category}</p>
                          <p className="text-gray-900 whitespace-no-wrap">Product name: {report.productName}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{user?.displayName}</p>
                          <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{report.message}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <label onClick={() => setDeletedOrder(report)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
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
        deletedOrder &&
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletedOrder.productName}. It cannot be undone!`}
          closeModal={closeModal}
          successAction={handleOrderDelete}
          successButtonName={`Delete`}
          modalData={deletedOrder}
        />
      }


    </section>
  );
};

export default MyOrder;