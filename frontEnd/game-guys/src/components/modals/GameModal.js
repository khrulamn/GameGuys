import { useContext, useState } from 'react'
import './Modal.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactTooltip from 'react-tooltip';
import AuthContext from '../../context/authContext';

export default function GameModal(props) {
    const [amount, setAmount] = useState(0)

    const navigate = useNavigate()

    const image = props.data.image
    const price = props.data.price.toFixed(2)
    const context = useContext(AuthContext)

    //Functions for increasing/decreasing amount to add to cart
    const inc = () => {
        setAmount(prevAmount => prevAmount + 1)
    }
    const dec = () => {
        setAmount(prevAmount => prevAmount - 1)
    }

    function addToCart() {
        const token = sessionStorage.getItem("token");

        const data = {
            console: null,
            game: {
                gameID: props.data._id,
                quantity: amount
            }
        };

        const config = {
            method: 'post',
            url: 'http://localhost:4444/add-to-cart',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    console.log('added to cart')
                    console.log(JSON.stringify(response.data));
                }
            })
            .then(() => {
                props.clickHandler()
                // window.location.reload();
            })
            .catch(function (error) {
                console.log({ error })
            });
    }

    const toReviews = () => {
        navigate(`/user-reviews?itemID=${props.data._id}&type=game`)
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animatedDiv"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primaryColor outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-white">
                                {props.data.name} ({props.data.platform})
                            </h3>
                        </div>
                        <div className="flex justify-center m-1">
                            <img className="h-[45vh]" src={image} alt="console" />
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <h3 className="font-medium text-4xl font-sans text-white"><span className="text-tertiaryColor font-main">RM</span> {price}</h3>
                            <p className="my-4 text-slate-300 text-lg leading-relaxed">
                                By {props.data.developer}
                            </p>
                            <p className="my-4 text-slate-300 text-lg leading-relaxed">
                                {props.data.description}
                            </p>
                            <div className='flex mb-3'>
                                <button className='mr-3' data-tip="To user reviews" onClick={toReviews}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-slate-500 hover:stroke-white ease-linear transition-all duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </button>
                                <button className='mx-3' data-tip='Watch trailer'>
                                    <a href={props.data.trailer} target="_blank" rel="noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-slate-500 hover:stroke-white ease-linear transition-all duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                        </svg>
                                    </a>
                                </button>
                            </div>
                            <div className='flex justify-between'>
                                <p className="text-slate-400">In stock: {props.data.quantity}</p>

                                <div className='flex items-center'>
                                    <button className='text-white text-3xl font-sans font-extrabold mr-3 disabled:text-slate-600 hover:text-tertiaryColor ease-linear transition-all duration-150' onClick={dec} disabled={amount < 1}>-</button>
                                    <p className='text-tertiaryColor text-3xl font-medium mr-3'>{amount}</p>
                                    <button className='text-white text-2xl font-sans font-extrabold mr-3 disabled:text-slate-600 hover:text-tertiaryColor ease-linear transition-all duration-150' onClick={inc} disabled={amount >= props.data.quantity}>+</button>
                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-slate-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:text-red-500"
                                type="button"
                                onClick={() => props.clickHandler()}
                            >
                                Close
                            </button>
                            <button
                                className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200 disabled:bg-slate-500"
                                type="button"
                                onClick={addToCart}
                                disabled={amount === 0 || props.data.quantity === 0 || !context.isLoggedIn}
                                data-tip="Add to cart"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            <ReactTooltip />
        </>
    )
}