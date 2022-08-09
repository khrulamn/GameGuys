import { React, useContext, useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import authContext from '../../context/authContext'

export default function Checkout() {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null)

    const context = useContext(authContext)

    useEffect(() => {

        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }
    }, [stripe])

    const handleSubmit = async (event) => {
        // prevents default behaviour of submit
        event.preventDefault();

        if (!stripe || !elements) {
            // if stripe has not loaded, form submission is disabled
            return
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/successful-payment'
            }
        })

        if (error.type === "card_error" || error.type === "validation_error") {
            setErrorMessage(error.message);
        } else {
            setErrorMessage("An unexpected error occurred.");
        }
        // if (error) {
        //     setErrorMessage(error.message);
        // } else {
        //     navigate('/')
        //     //customer redirected to return_url
        // }
    }

    return (
        <div className='w-[100vw] h-[calc(100vh-160px)] flex justify-center pt-[10%] bg-secondaryColor'>
            <div className="w-1/3">
                <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <div className='flex justify-center'>
                        <button className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-base px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400 mt-10 w-full" disabled={!stripe}>
                            Pay
                            <br/>
                            RM {context.totalPrice.toFixed(2)}
                        </button>

                    </div>
                    {errorMessage &&
                        <div className="text-white text-xl flex justify-center">
                            <p>
                                {errorMessage}
                            </p>
                        </div>}
                </form>
            </div>
        </div>


    )
}

/*
    User Clicks on Checkout (react)

    Call create-payment-intent api with amount and currency (react)

    create new paymentIntent w. amount and currency and return client_secret node
   
    initiate your stripe element and user will provide payment details (react)
   
    confirm payment once user clicks submit

    on success call payment-success api (react) (to tell backend user has made payment successfully)

    change order status to payment complete (node)
*/

/*
    webhook => stripe and server(node)

    server register webhook evetns for stripe
    events => payment_complete, payment_failed, refund_complete

    payment_complete
    stripe server will call our server with details about payment complete
*/