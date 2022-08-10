import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import ReactTooltip from 'react-tooltip';

export default function InputAddress() {

    const navigate = useNavigate()

    const [address, setAddress] = useState({
        address: "",
        state: "",
        postcode: ""
    })
    const [oldAddress, setOldAddress] = useState({})
    const [revealCurrAddress, setRevealCurrAddress] = useState(false)

    const inputEdited = (e) => {
        setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        const getPrevAddress = () => {
            const token = sessionStorage.getItem("token");
            const config = {
                method: 'get',
                url: 'http://localhost:4444/get-username',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };

            axios(config)
                .then(function (response) {
                    if (response.data.error) {
                        console.log(response.data.error)
                    } else {
                        console.log('response', response.data)
                        setOldAddress(response.data.address)
                    }
                })
                .then(() => {
                    console.log('address', oldAddress)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getPrevAddress()
    }, [])


    const addAddress = () => {
        const token = sessionStorage.getItem("token");

        console.log('address', address.address)
        const data = JSON.stringify({
            "address": address.address,
            "state": address.state,
            "postcode": address.postcode
        });

        const config = {
            method: 'post',
            url: 'http://localhost:4444/add-address',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log('res', response)
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    console.log(response.data.success)
                }
            })
            .then(() => {
                navigate('/')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //to reveal current address
    const showCurrAddress = () => {
        setRevealCurrAddress(!revealCurrAddress)
    }

    return (
        <>
            <div className="bg-secondaryColor w-[100vw] min-h-[calc(100vh-160px)] font-main">
                <div className="flex justify-center items-center w-full">
                    <div className="w-1/2 grid items-center relative">
                        <div className="mx-auto my-9">
                            <h1 className="text-white font-semibold text-2xl">Add your address</h1>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor='address' className="sr-only">
                                    Address
                                </label>
                                <input onChange={inputEdited} name="address" type="text" required placeholder="Address" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor='state' className="sr-only">
                                    State
                                </label>
                                <input onChange={inputEdited} name="state" type="text" required placeholder="State" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor='postcode' className="sr-only">
                                    Postcode
                                </label>
                                <input onChange={inputEdited} name="postcode" type="text" required placeholder="Postcode" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-red-500
                  focus:border-red-500 focus:z-10 sm:text-sm" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center p-6">
                            <button
                                className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400"
                                type="button"
                                onClick={addAddress}
                                disabled={!(address.address && address.state && address.postcode)}
                            >
                                Submit
                            </button>
                        </div>
                        {Object.keys(oldAddress).length !== 0 &&
                            <div className="absolute top-10">
                                <button data-tip="Reveal current address" onClick={showCurrAddress}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white hover:stroke-tertiaryColor ease-linear transition-all duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                </div>
                {revealCurrAddress &&
                    <div className=" text-white absolute top-[20%] left-[10%] ease-linear transition-all duration-150">
                        <h1 className="font-bold text-lg">Current address</h1>
                        <p>{oldAddress.address},</p>
                        <p>{oldAddress.state},</p>
                        <p>{oldAddress.postcode}</p>
                    </div>
                }
            </div>
            <ReactTooltip />
        </>

    )
}