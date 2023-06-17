import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';


const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleAddProduct = data => {
    const products = {
      name: data.name,
      sellerName: data.sellerName,
      location: data.location,
      category: data.category,
      image: data.image,
      quality: data.quality,
      resalePrice: parseFloat(data.resalePrice),
      originalPrice: parseFloat(data.originalPrice),
      yearsOfUse: data.yearOfUses,
      phone: data.phone,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL
    }
    // console.log(products);

    fetch('https://b612-used-products-resale-server-side-zeta.vercel.app/products', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(products)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data) {
          alert('product added successfully')
          navigate('/dashboard/myProduct')
        } else {
          toast.error(data.error)
        }
      })
      .catch(err => {
        toast.error(err.message)
      })
  }

  return (
    <section className='max-w-3xl mx-auto bg-white px-8 py-10 rounded-lg' data-aos='fade-up' data-aos-duration='1000'>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-theme-text mb-1">Product Name</label>
          <input type="text" {...register("name", { required: true })} placeholder="Product name" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-theme-text mb-1">User Name</label>
          <input type="text" {...register("sellerName", { required: true })} defaultValue={user?.displayName} placeholder="Product sellerName" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-theme-text mb-1">Location</label>
          <input type="text" {...register("location", { required: true })} placeholder="Location" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />

        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div className="mb-6">
            <label className="block text-sm font-medium text-theme-text mb-1">Product Category</label>
            <input type="text" {...register("category", { required: true })} placeholder="category" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />

          </div>
          <div className="mb-6" >
            <label className="block text-sm font-medium text-theme-text mb-1">Product Quality</label>
            <select className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" {...register("quality", { required: true })}>
              <option value='excellent'>Excellent</option>
              <option value='good'>Good</option>
              <option value='fair'>Fair</option>
            </select>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
          <div className="mb-6">
            <label className="block text-sm font-medium text-theme-text mb-1">Resale Price</label>
            <input type="text" {...register("resalePrice", { required: true })} placeholder="Resale Price" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />

          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-theme-text mb-1">Original Price</label>
            <input type="text" {...register("originalPrice", { required: true })} placeholder="Original Price" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />

          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-theme-text mb-1">Year of Uses</label>
            <input type="text" {...register("yearOfUses", { required: true })} placeholder="Year of uses" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />

          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-theme-text mb-1">Phone</label>
          <input type="text" {...register("phone", { required: true })} placeholder="Phone" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />

        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-theme-text mb-1">Product Image</label>
          <input type="text" {...register("image", { required: true })} placeholder="image" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
        </div>

        <div className='flex justify-end'>
          <button className='btn rounded-[5px] bg-orange-600 text-white leading-6 text-base'>Add Product</button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;