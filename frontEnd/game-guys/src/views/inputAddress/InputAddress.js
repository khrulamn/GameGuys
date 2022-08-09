import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function InputAddress() {

    const navigate = useNavigate()

    const [address, setAddress] = useState({
        address: "",
        state: "",
        postcode: ""
    })

    const inputEdited = (e) => {
        setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

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
                console.log('res',response)
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

    return (
        <div className="bg-secondaryColor w-[100vw] h-[100vh]">
            <div className=" flex justify-center items-center">
                <div className="w-1/3 grid items-center">
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
                </div>
            </div>
        </div>


    )
}