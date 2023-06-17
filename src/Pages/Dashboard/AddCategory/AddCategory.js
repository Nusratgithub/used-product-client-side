import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Components/Button/Button';
// import useSetTitle from '../../../Hooks/useSetTitle';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddCategory = () => {
  // useSetTitle('Add Category')
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm();

  const handleAddProduct = data => {
    const addCategory = {
      category: data.name
    }
    // Save doctor information to tha database
    fetch('https://b612-used-products-resale-server-side-zeta.vercel.app/category', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(addCategory)
    })
      .then(res => res.json())
      .then(data => {
        toast.success(data.message, { autoClose: 400 })
        navigate('/dashboard/all-category')
      })
  }


  return (
    <section className='max-w-3xl mx-auto bg-white px-8 py-10 rounded-lg' data-aos='fade-up' data-aos-duration='1000'>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-theme-text mb-1">Category Name</label>
          <input type="text" {...register("name", { required: true })} placeholder="Product name" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
          {errors.name && <p className='text-red-600 text-xs text-left' role="alert">{errors.name?.message}</p>}
        </div>
        <div className='flex justify-end'>
          <Button classes={'py-3 px-5'} btnText={'Add Category'} />
        </div>
      </form>
    </section>
  );
};

export default AddCategory;