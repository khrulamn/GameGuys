import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import UserItemReviews from "../../components/reviews/UserItemReviews"

export default function UserReviews() {
    const [item, setItem] = useState({})
    //to get game/console data from query
    const search = useLocation().search
    const itemID = new URLSearchParams(search).get('itemID')
    const type = new URLSearchParams(search).get('type')

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
                    setItem(response.data.result[0])
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
                    setItem(response.data.result[0])
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        // eslint-disable-next-line
    }, [])

    const navigate = useNavigate()

    const backHome = () => {
        navigate('/')
    }

    console.log('item',item)

    return (
        <div className="bg-secondaryColor min-h-[calc(100vh-160px)] font-main">
            <div className=" flex justify-center items-center">
                <div className="w-1/2 grid items-center">
                    <div className="ml-5 text-center my-11">
                        <h1 className="text-white text-4xl font-semibold">User Reviews</h1>
                    </div>
                    {Object.keys(item).length !== 0 &&
                        <>
                            <div className="flex mb-7">
                                <div>
                                    <img className="w-3/4" src={item.image} alt='item' />
                                </div>
                                <div>
                                    <div className="mx-auto my-9">
                                        <h1 className="text-tertiaryColor font-semibold text-3xl">{item.name}</h1>
                                    </div>
                                    <div>
                                        <p className="text-white">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    <div>

                        {Object.keys(item.reviews).length !== 0
                            ?
                            <div>
                                {item.reviews && item.reviews.map((data, index) => <UserItemReviews key={index} data={data} />)}
                            </div>
                            :
                            <div className='flex flex-col justify-center items-center bg-gray-700 rounded-md p-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-white m-2 text-lg text-center">
                                    No user reviews yet. <br/> To review, you must purchase the item first <br/>and proceed to shopping history.
                                    </h3>
                            </div>
                        }
                    </div>

                    <div className="flex items-center justify-center p-6">
                        <button
                            className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400"
                            type="button"
                            onClick={backHome}
                        >
                            Back to home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}