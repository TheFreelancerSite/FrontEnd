    import React from 'react'
    import "./Payment.scss"
    import { loadStripe } from '@stripe/stripe-js'
    import { useEffect } from 'react';
    import axios from 'axios'
    import { useState } from 'react';
    import CheckOut from '../../components/checkoutForm/CheckOut';
    import { Elements } from '@stripe/react-stripe-js';
    import { useParams } from 'react-router-dom';
    function Payment() {
        const [stripePromise,setStripePromise]=useState(null);
        const [amount, setAmount] = useState("")
        const [clientSecret,setClientSecret]=useState("")
        const paymentEntities =useParams()

        const handleAmountChange = (event) => {
            setAmount(event.target.value);
          };

        useEffect(()=>{
            axios.get("http://localhost:3000/payment/config")
            .then((response)=>{
                setStripePromise(loadStripe(response.data.publishableKey))

            })
        },[])

        useEffect(() => {
            // Check if amount is truthy before making the request
            if (amount) {
              axios.post(`http://localhost:3000/payment/intents/`, {
                amount: parseInt(amount)
              })
                .then((response) => {
                  console.log(response.data);
                  setClientSecret(response.data.paymentIntent);
                })
                .catch((error) => {
                  console.log("Error:", error);
                });
            }
          }, [amount]);

    return (
        <div className='big-container'>
                <div className='container'>
        <h1>Payment Element </h1>
        <p className='text'>amount</p>
        <input           
         type='number'
          placeholder='Amount'
          className='amount'
          value={amount}
          onChange={handleAmountChange}/>


        {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{clientSecret}}>
                <CheckOut clientId={paymentEntities.clientId} freelancerId={paymentEntities.freelancerId} serviceId={paymentEntities.serviceId} clientSecret={clientSecret} />
                </Elements>
        ) }

        
        </div>
        </div>

    )
    } 

    export default Payment
