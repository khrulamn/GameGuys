import { useState } from 'react'
import './Modal.css'
import axios from 'axios'

export default function GameModal(props) {
    const [amount, setAmount] = useState(0)

    const image = props.data.image
    const price = props.data.price.toFixed(2)

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
                // console.log("response", response)
                if(response.data.error){
                    alert('error, please try again later')
                } else {
                    alert('added to cart')
                    console.log(JSON.stringify(response.data));
                } 
            })
            .then(() => {
                props.clickHandler()
                // window.location.reload();
            })
            .catch(function (error) {
                console.log({error})
            });
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
                            <h3 className="font-medium text-4xl text-white"><span className="text-tertiaryColor">RM</span> {price}</h3>
                            <p className="my-4 text-slate-300 text-lg leading-relaxed">
                                By {props.data.developer}
                            </p>
                            <p className="my-4 text-slate-300 text-lg leading-relaxed">
                                {props.data.description}
                                <a className="ml-4 text-slate-500 hover:text-slate-300 ease-linear transition-all duration-150" href={props.data.trailer} target="_blank" rel="noreferrer">trailer..</a>
                            </p>
                            <div className='flex justify-between'>
                                <p className="text-slate-400">In stock: {props.data.quantity}</p>

                                <div className='flex items-center'>
                                    <button className='text-white text-3xl font-sans font-extrabold mr-3 disabled:text-slate-600 hover:text-tertiaryColor ease-linear transition-all duration-150' onClick={dec} disabled={amount < 1}>-</button>
                                    <p className='text-tertiaryColor text-3xl font-medium mr-3'>{amount}</p>
                                    <button className='text-white text-2xl font-sans font-extrabold mr-3 disabled:text-slate-600 hover:text-tertiaryColor ease-linear transition-all duration-150' onClick={inc} disabled={amount >= props.data.quantity}>+</button>
                                </div>
                            </div>                        </div>
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
                                disabled={amount === 0 || props.data.quantity === 0}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}