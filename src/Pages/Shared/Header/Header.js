import React, { useContext, useState } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const Header = () => {
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => { 
        toast.warning('User Logout Successfully!', { autoClose: 400 })
      })
      .catch(error => {
        toast.error(error.message, { autoClose: 400 })
      })
  }
  const menuItems =
    <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/products'>Products</Link></li>
      <li><Link to='/blog'>Blog</Link></li>
      <li><Link to='/contact'>Contact Us</Link></li>
    </>

  return (
    <div className="container mx-auto bg-base-200 px-2 py-6 mb-7">
        <div className="">
          <div className="relative flex items-center justify-between">
            <Link to='/' className="flex">
              <img className='w-12 mr-4 rounded-full' src='https://png.pngtree.com/template/20190928/ourmid/pngtree-gold-furniture-lamp-chair-interior-logo-design-template-inspirat-image_312127.jpg' alt='' />
              <h1 className='text-2xl font-bold italic font-serif my-auto'>Furniture</h1>
            </Link>
            <ul className="items-center font-semibold text-black hidden space-x-8 lg:flex">
               {menuItems}
              {
                user?.uid ?
                <>
                  <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li>
                    <button onClick={handleLogOut} className='border py-2 px-3 rounded font-semibold hover:text-white  mt-2 text-orange-600 hover:bg-orange-600  border-orange-600'>
                        Logout
                      </button>
                    </li>
                  </>
                  :
                  <li>
                    <NavLink
                      to="/login"
                      aria-label="Login"
                      title="Login"
                    className='border py-2 px-3 rounded font-semibold hover:text-white  mt-2 text-orange-600 hover:bg-orange-600  border-orange-600'
                    >
                      Login
                    </NavLink>
                  </li>
              }
            </ul>
            <div className="lg:hidden ">
              <button
                aria-label="Open Menu"
                title="Open Menu"
                className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className="w-5 text-black" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full bg-white z-10">
                  <div className="p-4 bg-white  shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Link
                          to="/"
                          className="text-xl inline-flex items-center italic font-bold text-black"
                        >
                          Furniture
                        </Link>
                      </div>
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          className="p-2 -mt-2 -mr-2 transition duration-200 rounded text-theme-slate-300 hover:text-themeOrange-10 focus:outline-none focus:shadow-outline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg className="w-5 text-theme-dark" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul className="space-y-6">
                        {menuItems}

                        {
                          user?.uid ?
                          <>
                            <li><Link to='/dashboard'>Dashboard</Link></li>
                              <li>
                              <button onClick={handleLogOut} className='border py-2 px-3 rounded font-semibold hover:text-white  mt-2 text-orange-600 hover:bg-orange-600  border-orange-600'>
                                  Logout
                                </button>
                              </li>
                            </>
                            :
                            <li>
                              <NavLink
                                to="/login"
                                aria-label="Login"
                                title="Login"
                              className='border py-2 px-3 rounded font-semibold hover:text-white  mt-2 text-orange-600 hover:bg-orange-600  border-orange-600'
                              >
                                Login
                              </NavLink>
                            </li>
                        }
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Header;