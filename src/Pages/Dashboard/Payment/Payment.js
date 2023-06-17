import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
;


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)
// console.log(stripePromise);

const Payment = () => {
  const booking = useLoaderData();
  // console.log(booking); 

  return (
    <div>
      <h3 className="text-xl font-semibold py-3">Payment for {booking.category}</h3>
      <p className="text-xl">Please pay <strong>${booking.price}</strong> for your appointment on {} at {}</p>
      <div className='w-full my-8 bg-white p-5'>
       <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>

      </div>
    </div>
  );
};

export default Payment;