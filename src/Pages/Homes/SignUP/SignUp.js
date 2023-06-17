import React from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import Button from '../../../Components/Button/Button.jsx'
import SmallSpinner from '../../../Components/Spinner/SmallSpinner'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useToken from '../../../Hooks/useToken';


const SignUp = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { createUser, updateUserInfo, loading, setLoading } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState('')
  const [createdUserEmail, setCreatedUserEmail] = useState('')
  const [token] = useToken(createdUserEmail);
  const imageUploadApiKey = process.env.REACT_APP_IMGBB_API_KEY
  const navigate = useNavigate();

  if (token) {
    navigate('/')
  }

  const handleUserRegister = data => {
    setRegisterError('')
    const image = data.image[0]
    const formData = new FormData()
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?key=${imageUploadApiKey}`
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        if (imgData.success) {
          createUser(data.email, data.password)
            .then(result => {
              handleUpdateUser(data.name, imgData.data.url)
              saveUserInfo(data.name, data.email, data.password, data.role, imgData.data.url)
              toast.success('User Create Successfully!', { autoClose: 400 })
              setLoading(false)
              navigate("/")
            })
            .catch(error => {
              setRegisterError(error.message)
            })
        }
      })
      .catch(error => {
        setRegisterError(error.message)
      })

  }
  // User update information 
  const handleUpdateUser = (name, photoURL) => {
    updateUserInfo({ displayName: name, photoURL: photoURL })
      .then(() => {
        setLoading(false)
      })
      .catch(error => {
        toast.error(error.message, { autoClose: 500 })
      })
  }

  // Save user info in database
  const saveUserInfo = (name, email, password, role, image) => {
    const user = {
      name,
      email,
      password,
      role,
      image
    }
    fetch('https://b612-used-products-resale-server-side-zeta.vercel.app/users', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setCreatedUserEmail(email)

      })
  }


  return (
    <div className="hero w-full my-12">
      <div className="hero-content grid gap-8 lg:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className='' src='https://www.go.ooo/img/bg-img/Login.jpg' alt="" />
        </div>
        <div className="card flex-shrink-0 w-full px-5  shadow bg-base-100 py-10">
          <h1 className="text-5xl text-center font-bold text-orange-600 pb-10">Sign Up</h1>
          <form onSubmit={handleSubmit(handleUserRegister)}>
            <div className="mb-6">
              <input type="text" {...register("name", { required: true, minLength: { value: 4, message: 'Name must be 4 character or longer' } })} placeholder="Name" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
              {errors.name && <p className='text-red-600 text-xs text-left' role="alert">{errors.name?.message}</p>}
            </div>
            <div className="mb-6">
              <input type="email" {...register("email", { required: true })} placeholder="Email" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
              {errors.email && <p className='text-red-600 text-xs text-left' role="alert">{errors.email?.message}</p>}
            </div>
            <div className="mb-6">
              <select className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" {...register("role", { required: true })} >
                <option value='buyer'>Buyer</option>
                <option value='seller'>Seller</option>
              </select>
            </div>
            <div className="mb-6">
              <input type="file" {...register("image", { required: true })} placeholder="image" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
            </div>
            <div className="mb-6">
              <input type="password" {...register("password", {
                required: true,
                minLength: { value: 6, message: 'Password must be 6 character or longer!' },
              })} placeholder="Password" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
              {errors.password && <p className='text-red-600 text-xs text-left' role="alert">{errors.password?.message}</p>}
            </div>
            <div className="mb-10">
              <Button classes={'w-full block py-3'} btnText={loading ? <SmallSpinner /> : 'Sign Up'} />
            </div>
            {registerError && <p className='text-red-600 text-sm text-center mb-5' role="alert">{registerError}</p>}
          </form>
          <p className='text-center'>Already have an account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;