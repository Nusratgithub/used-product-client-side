import React, { useContext } from 'react';
import { toast } from 'react-toastify'
import Button from '../../Components/Button/Button';
import SmallSpinner from '../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const ProductBookModal = ({ productData, setProductData }) => {
  // console.log(productData);
  const { user, loading, setLoading } = useContext(AuthContext)
  const { image, name, resalePrice, _id } = productData;
  const navigate = useNavigate()

  const handleBooking = e => {
    e.preventDefault();
    const form = e.target
    const names = form.name.value
    const email = form.email.value
    const phone = form.phone.value
    const location = form.location.value
    // console.log(names, email, phone, location);

    const ordersData = {
      names,
      email,
      image,
      category: name,
      productId: _id,
      price: resalePrice,
      phone,
      location,

    }
    fetch('https://b612-used-products-resale-server-side-zeta.vercel.app/orders', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(ordersData)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setProductData(data)
        if (data.acknowledged) {
          alert("order placed successful")
          navigate('/dashboard/orders')
        } else {
          toast.error(data.message)
        }
      })
  }

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Name: {name}</h3>
          <h3 className="text-lg font-bold">Price: $ {resalePrice}</h3>
          <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
            <div className='mb-2'>
              <input type="text" name="name" defaultValue={user?.displayName} disabled placeholder='Your Name' className="py-[15px] px-[19px] bg-[#E8F0FE] text-base placeholder-[#3A425666] text-theme-3rd leading-5 border rounded-lg focus:outline-none w-full" required />
            </div>
            <div className='mb-2'>
              <input type="email" name="email" defaultValue={user?.email} disabled placeholder='Email Address' className="py-[15px] px-[19px] bg-[#E8F0FE] text-base placeholder-[#3A425666] text-theme-3rd leading-5 border rounded-lg focus:outline-none w-full" required />
            </div>
            <div className='mb-2'>
              <input type="text" name="phone" placeholder='Phone Number' className="py-[15px] px-[19px] bg-white text-base placeholder-[#3A425666] text-theme-3rd leading-5 border rounded-lg focus:outline-none w-full" required />
            </div>
            <div className='mb-2'>
              <input type="text" name="location" placeholder='Location' className="py-[15px] px-[19px] bg-white text-base placeholder-[#3A425666] text-theme-3rd leading-5 border rounded-lg focus:outline-none w-full" required />
            </div>
            <div className='text-center'>
              <input className='btn w-full' type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductBookModal;