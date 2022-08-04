import axios from 'axios'
import { useEffect, useState } from 'react'
import Cart from '../cart/Cart'

export default function CartModal(props) {

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        return
    }, [])

    function getCart(){
        return
    }

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
                            <div className="flex justify-center p-5 border-b border-solid border-slate-500 rounded-t mb-7
                                ">
                                <h3 className="text-3xl font-semibold text-white">
                                    Your Cart
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="rounded-md shadow-sm -space-y-px">
                                {cartItems.length == 0 
                                ? <p className='text-white'>Loading</p>
                                : cartItems.map((index,data) => <Cart key={index} data={data}/>)
                            }
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-center p-6">
                                <button
                                    className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400"
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