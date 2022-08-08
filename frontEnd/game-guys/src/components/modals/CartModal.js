import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Cart from '../cart/Cart'
import authContext from '../../context/authContext'


export default function CartModal(props) {

    const [consoleCartItems, setConsoleCartItems] = useState([])
    const [gameCartItems, setGameCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const context = useContext(authContext)

    useEffect(() => {
        if (context.isLoggedIn) {
            getCart()
        }
    }, [context.isLoggedIn])

    useEffect(() => {
        if (context.addToCart){
            getCart()
        }
    }, [context.addedToCart, context.addToCart])

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

    useEffect(() => {
        function getTotalPrice() {
            let total = 0
            consoleCartItems.map((item) => {
                total += (item.price * item.quantity)
                return total
            })
            gameCartItems.map((item) => {
                total += (item.price * item.quantity)
                return total
            })
            return total
        }
        let price = getTotalPrice().toFixed(2)
        setTotalPrice(price)
    }, [consoleCartItems, gameCartItems])

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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                                    ? <p className='text-white'>You have no items in cart!</p>
                                    : (<div className='flex flex-col justify-center font-main'>
                                        {consoleCartItems.length !== 0 &&
                                            <div>
                                                <h2 className="text-white text-3xl">Consoles</h2>
                                                {consoleCartItems.map((data, index) => <Cart key={index} data={data} />)}
                                            </div>
                                        }

                                        {gameCartItems.length !== 0 &&
                                            <div>
                                                <h2 className="text-white text-3xl">Games</h2>
                                                {gameCartItems.map((data, index) => <Cart key={index} data={data} />)}
                                            </div>
                                        }
                                        <div className='flex justify-end'>
                                            <div>
                                                <h3 className="text-white text-2xl">Total price:</h3>
                                                <p className="text-white text-xl">RM{totalPrice}</p>
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
                                    onClick={() => props.cartHandler()}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black" onClick={() => props.cartHandler()}></div>
            </>
        )
    }
    else {
        return null
    }
}