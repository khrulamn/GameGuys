import axios from 'axios'
import { useEffect, useState } from 'react';
import PaidItems from '../../components/payment/PaidItems';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SuccessfulPayment() {

    const [consolePaidItems, setConsolePaidItems] = useState([])
    const [gamePaidItems, setGamePaidItems] = useState([])
    const navigate = useNavigate()

    //fetching paymentID
    const search = useLocation().search;
    const payment_id = new URLSearchParams(search).get('payment_intent')
    console.log(payment_id)

    // to fetch paid item data from cart first
    useEffect(() => {
        const getCart = () => {
            const token = sessionStorage.getItem("token");
            const config = {
                method: 'get',
                url: 'http://localhost:4444/get-cart',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(config)
                .then(function (response) {
                    let resultConsole = response.data.consoles
                    setConsolePaidItems(resultConsole)
                    let resultGame = response.data.games
                    setGamePaidItems(resultGame)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getCart()
    }, [])

    //function to reduce stock after purchasing
    const reduceStock = (type) => {
        const token = sessionStorage.getItem('token')

        if (consolePaidItems.length > 0) {
            for (const item of consolePaidItems) {
                let data = {
                    item_id: item._id,
                    qtyToMinus: item.quantity
                }
                const config = {
                    method: 'post',
                    url: 'http://localhost:4444/minus-console-stock',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    data: data
                };
                axios(config)
                    .then(function (response) {
                        if (response.data.error) {
                            console.log(response.data.error)
                        }
                        else {
                            console.log(response.data.result)
                        }
                    })
            }
        }

        if (gamePaidItems.length > 0) {
            for (const item of gamePaidItems) {
                let data = {
                    item_id: item._id,
                    qtyToMinus: item.quantity
                }
                const config = {
                    method: 'post',
                    url: 'http://localhost:4444/minus-game-stock',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    data: data
                };
                axios(config)
                    .then(function (response) {
                        if (response.data.error) {
                            console.log(response.data.error)
                        }
                        else {
                            console.log(response.data.result)
                        }
                    })
            }
        }
    }

    const paymentSuccess = () => {
        const token = sessionStorage.getItem("token");

        const data = {
            payment_intent: payment_id,
            console_items: consolePaidItems,
            game_items: gamePaidItems
        };

        //adding purchase to purchase collection in db
        const config = {
            method: 'post',
            url: 'http://localhost:4444/purchase-success',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.error) {
                    console.log(response.data.error)
                }
                else {
                    console.log(response.data.result)
                }
            })
            .then(() => {
                //removing all cart items
                const config = {
                    method: 'post',
                    url: 'http://localhost:4444/delete-cart',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        if (response.data.error) {
                            console.log(response.data.error)
                        }
                        else {
                            console.log(response.data.result)
                        }
                    })
                    .then(() => {
                        reduceStock()
                    })
                    .then(() => {
                        navigate('/')
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <div className="w-[100vw] h-[calc(100vh-160px)] bg-secondaryColor font-main">
            <div className="grid justify-center items-center">
                <div className='m-5 text-center'>
                    <h2 className="text-white text-xl">You have successfully paid for :</h2>
                </div>
                <div>
                    {gamePaidItems.length !== 0 &&
                        gamePaidItems.map((data, index) => <PaidItems key={index} data={data} />)
                    }
                    {consolePaidItems.length !== 0 &&
                        consolePaidItems.map((data, index) => <PaidItems key={index} data={data} />)
                    }
                </div>
                <div className="flex items-center justify-center p-6">
                    <button
                        className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400"
                        type="button"
                        onClick={() => paymentSuccess()}
                    >
                        Back to home
                    </button>
                </div>
            </div>
        </div>
    )
}