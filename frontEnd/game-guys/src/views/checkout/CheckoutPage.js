import Checkout from '../../components/payment/Checkout'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useContext } from 'react';
// import axios from 'axios'
import authContext from '../../context/authContext'

const stripePromise = loadStripe('pk_test_51LPdv4KzOPas1PZJZCMLzMfmXvtIAovnyeb8oQSElJdphtGHvWbLBy3ujTgXFNac2qT7Cadyc3wImqHSSovFpOS400j4vFHUOw');

export default function CheckoutPage() {
    const context = useContext(authContext)

    const options = {
        clientSecret: context.clientSecret,
        appearance: {
            theme: 'night',
            labels: 'floating'
        },
    }

    return (
        <div className="container">
            <Elements stripe={stripePromise} options={options}>
                <Checkout />
            </Elements>
        </div>
    )
}