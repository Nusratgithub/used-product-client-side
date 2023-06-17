import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/images/error.jpg'

const ErrorPage = () => {
  return (
    <section className=''>
      <div className=''>
        <div className='text-center'>
          <img className='h-80 mx-auto mb-4 mt-7' src={img} alt='' />
          <h2 className=' font-extrabold text-3xl'>
            <span className=''>Error</span>404
          </h2>
          <h3 className='font-bold my-4 text-2xl'>
            Sorry, we couldn't find this page.
          </h3>
          <Link
            to='/'
            className=''
          >
            <button className='btn btn-outline'> Back to homepage</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage