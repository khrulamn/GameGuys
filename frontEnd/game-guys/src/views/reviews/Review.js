import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Review() {

    const [review, setReview] = useState({
        title: "",
        text: ""
    })
    const [itemToReview, setItemToReview] = useState(null)
    //to get game/console data from query
    const search = useLocation().search
    const itemID = new URLSearchParams(search).get('itemID')
    const type = new URLSearchParams(search).get('type')

    const navigate = useNavigate()

    //Use effect to get complete game/console data
    useEffect(() => {
        if (type === "game") {
            const token = sessionStorage.getItem("token");
            const config = {
                method: 'get',
                url: `http://localhost:4444/get-one-game?gameID=${itemID}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(config)
                .then(function (response) {
                    console.log(response.data.result)
                    setItemToReview(response.data.result[0])
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else if (type === "console") {
            const token = sessionStorage.getItem("token");
            const config = {
                method: 'get',
                url: `http://localhost:4444/get-one-console?consoleID=${itemID}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(config)
                .then(function (response) {
                    console.log(response.data.result[0])
                    setItemToReview(response.data.result[0])
                }).then(() => {
                    console.log('item', itemToReview)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [])

    //Keeping track of inputs
    const inputEdited = (e) => {
        setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const sendReview = () => {
        const token = sessionStorage.getItem("token");
        const data = JSON.stringify({
            "review_title": review.title,
            "review_text": review.text,
            "item_id": itemID
        });

        const config = {
            method: 'post',
            url: `http://localhost:4444/review-${type}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    console.log(response.data.result)
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
        <div className="bg-secondaryColor min-h-[calc(100vh-160px)] font-main">
            <div className=" flex justify-center items-center">
                <div className="w-1/3 grid items-center">
                    <div className="mx-auto my-9">
                        <h1 className="text-white font-semibold text-3xl">Item Review</h1>
                    </div>
                    {itemToReview !== null &&
                        <>
                            <div className="flex justify-center items-center mb-7">
                                <img className="w-2/6" src={itemToReview.image} alt='item' />
                            </div>
                            <div className="text-center mb-11">
                                <h2 className="text-white text-2xl">{itemToReview.brand}{itemToReview.name}</h2>
                            </div>
                        </>
                    }
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <p className="text-white">Title</p>
                            <label htmlFor='title' className="sr-only">
                                Title
                            </label>
                            <input onChange={inputEdited} name="title" type="text" required className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm" />
                        </div>
                        <div className="pt-4">
                            <p className="text-white">Description</p>
                            <label htmlFor='text' className="sr-only">
                                Description
                            </label>
                            <textarea onChange={inputEdited} name="text" required className=" relative block
                  w-full h-28 px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm"/>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6">
                        <button
                            className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400"
                            type="button"
                            onClick={sendReview}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}