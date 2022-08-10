import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Cart from '../cart/Cart'
import authContext from '../../context/authContext'
import { useNavigate } from 'react-router-dom'


export default function CartModal(props) {

    const [consoleCartItems, setConsoleCartItems] = useState([])
    const [gameCartItems, setGameCartItems] = useState([])

    const context = useContext(authContext)
    const navigate = useNavigate()

    //get cart items whenever user is logged in
    useEffect(() => {
        if (context.isLoggedIn) {
            getCart()
        }
    }, [context.isLoggedIn])

    //get cart items (stored in two arrays [console], [game])
    function getCart() {
        const token = sessionStorage.getItem("token");

        if (token) {
            var config = {
                method: 'get',
                url: 'http://localhost:4444/get-cart',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(config)
                .then(function (response) {
                    let resultConsole = response.data.consoles
                    setConsoleCartItems(resultConsole)
                    let resultGame = response.data.games
                    setGameCartItems(resultGame)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    //get total price for both category of items in cart
    useEffect(() => {
        function getTotalPrice() {
            let total = 0
            consoleCartItems.forEach((item) => {
                total += (item.price * item.quantity)
            })
            gameCartItems.forEach((item) => {
                total += (item.price * item.quantity)
            })
            return total
        }
        let price = getTotalPrice()
        context.setTotalPrice(price)
    }, [consoleCartItems, gameCartItems])

    //create payment intent to use when checkout
    useEffect(() => {
        if (context.totalPrice !== 0) {
            axios.post('http://localhost:4444/create-payment-intent', {
                total_price: context.totalPrice
            }).then((response) => {
                if (response.data.error) {
                    console.log({ error: response.data.error })
                }
                context.newClientSecret(response.data.clientSecret)
            })
        }
    }, [context.totalPrice])

    //when checkout button is clicked
    function toCheckout() {
        props.cartHandler()
        navigate('/checkout')
    }

    console.log("clientsecret", context.clientSecret)
    console.log('totalprice', context.totalPrice)

    if (props.cartAppear) {
        return (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animatedDiv"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primaryColor outline-none focus:outline-none px-12 py-7">
                            {/*header*/}
                            <div className="absolute right-5 top-5">
                                <button onClick={props.cartHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex justify-center p-5 border-b border-solid border-slate-500 rounded-t mb-7 font-main
                                ">
                                <h3 className="text-3xl font-semibold text-white">
                                    Your Cart
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="rounded-md shadow-sm -space-y-px">
                                {(consoleCartItems.length === 0 && gameCartItems.length === 0)
                                    ?
                                    <div className='flex flex-col justify-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <p className='text-white mt-3 text-lg'>You have no items in cart!</p>
                                    </div>
                                    :
                                    (<div className='flex flex-col justify-center font-main'>
                                        {consoleCartItems.length !== 0 &&
                                            <div>
                                                <h2 className="text-white text-3xl">Consoles</h2>
                                                {consoleCartItems.map((data, index) => <Cart key={index} data={data} consoleItem={true} getCart={getCart} />)}
                                            </div>
                                        }

                                        {gameCartItems.length !== 0 &&
                                            <div>
                                                <h2 className="text-white text-3xl">Games</h2>
                                                {gameCartItems.map((data, index) => <Cart key={index} data={data} gameItem={true} getCart={getCart} />)}
                                            </div>
                                        }
                                        <div className='flex justify-end'>
                                            <div>
                                                <h3 className="text-white text-2xl">Total price:</h3>
                                                <p className="text-white text-xl font-sans">RM {context.totalPrice.toFixed(2)}</p>
                                            </div>
                                        </div>

                                    </div>)
                                }


                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-center p-6 font-main">
                                <button
                                    className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-slate-400 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={toCheckout}
                                    disabled={consoleCartItems.length === 0 && gameCartItems.length === 0}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>

            </>
        )
    }
    else {
        return null
    }
}