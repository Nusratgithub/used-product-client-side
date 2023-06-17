import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { FaGoogle,FaGithub } from 'react-icons/fa';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import useToken from '../../../Hooks/useToken';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { providerLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const { signIn,loading,setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [loginUserEmail, setLoginUserEmail] = useState('')
  const location = useLocation();
  const [token] = useToken(loginUserEmail);
  const from = location.state?.from?.pathname || '/'

  if (token) {
    navigate('/')
  }

  const handleLogin = data => {
    setError('')
    signIn(data.email, data.password)
      .then(result => {
        setLoginUserEmail(data.email)
        toast.success('User Login Successfully!', { autoClose: 400 })
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
      })
  }


  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then(result => {
        const user = result.user;
        // console.log(user);
        setError('');
        navigate('/')
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div className="hero w-full my-12">
      <div className="hero-content grid gap-8 lg:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className='' src='https://www.go.ooo/img/bg-img/Login.jpg' alt="" />
        </div>
        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 py-20">
          <h1 className="text-5xl text-center font-bold text-orange-600">Login</h1>
          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="text"  {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
              <label className="label">
                <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <p className='text-orange-600'>{error}</p>
            <div className="form-control mt-6">
              <input className="text-orange-600 border p-2 rounded-md font-semibold hover:bg-orange-600 hover:text-white border-orange-600" type="submit" value="Login" />
            </div>
          </form>
          <div className='flex justify-center gap-4 my-3'>
            <button onClick={handleGoogleSignIn} className='text-orange-600 border p-2 rounded-md font-semibold hover:bg-orange-600 hover:text-white border-orange-600'>
               <FaGoogle className='mr-2 inline'></FaGoogle>Google</button>
            <button className='text-orange-600 border p-2 rounded-md font-semibold hover:bg-orange-600 hover:text-white border-orange-600'>
              <FaGithub className='mr-2 inline'></FaGithub>Github</button>
          </div>
          <p className='text-center'>New to this website? Please 
            <Link className='text-orange-600 font-bold' to="/register"> Sign Up</Link>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Login;