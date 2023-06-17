import React, { useState } from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { useEffect } from 'react';


const MyOrder = () => {
  const { user, isLoading, logOut } = useContext(AuthContext)
  const [orders, setOrders] = useState([]);
  const [deletedOrder, setDeletedOrder] = useState(null)

  useEffect(() => {
    fetch(`https://b612-used-products-resale-server-side-blush.vercel.app/orders?email=${user?.email}`, {
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          return logOut()
        }
        return res.json()
      })
      .then(data => {
        setOrders(data)
      })
  }, [user?.email, logOut])

  if (isLoading) {
    return <LoadingSpinner />
  }

  const closeModal = () => {
    setDeletedOrder(null)
  }
  const handleOrderDelete = orderId => {
    fetch(`https://b612-used-products-resale-server-side-blush.vercel.app/orders/${orderId}`, {
      method: "DELETE",
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.deletedCount > 0) {
          alert("order deleted successfully")

        }
      })
  }

  return (
    <section className="container mx-auto">
      <div className="">
        <h3 className='text-3xl mb-4 font-semibold'>You have {orders.length} orders</h3>
        <div className="overflow-x-auto w-full">
          {
            orders?.length ?
              <table className="table  w-full" data-aos='fade-up' data-aos-duration='1000'>
                <thead>
                  <tr>
                    <th> Image </th>
                    <th> Name </th>
                    <th> Price </th>
                    <th> Payment </th>
                    <th> Action</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    orders?.map(order => (
                      <tr key={order._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img className="w-full h-full rounded-full" src={order.image} alt="" />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{order.category}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">$ {order.price}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {
                            !order.paid &&
                            <Link to={`/dashboard/payment/${order._id}`}>
                              <button className='cursor-pointer bg-black py-1 px-3 text-xs text-white font-bold rounded-full'>Pay</button>
                            </Link>
                          }
                          {
                            order.paid &&
                            <button className='cursor-pointer bg-success py-1 px-3 text-xs text-white font-bold rounded-full'>Paid</button>
                          }

                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <label onClick={() => setDeletedOrder(order)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
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
          message={`If you delete ${deletedOrder.category}. It cannot be undone!`}
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