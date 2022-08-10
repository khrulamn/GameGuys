import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';

export default function Cart(props) {
    const [removeClicked, setRemoveClicked] = useState(0)
    const context = useContext(AuthContext)

    //remove item from the cart
    function removeItem(){
        let data = null
        if (props.consoleItem){         //if console item clicked
            data = JSON.stringify({
                consoleID: props.data._id,
                gameID: null
            });
        }
        else if(props.gameItem){        //if game item clicked
            data = JSON.stringify({
                gameID: props.data._id,
                consoleID : null
            });
        }
        console.log("data", data)

        const config = {
            method: 'post',
            url: 'http://localhost:4444/remove-from-cart',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    console.log(response.data.result)
                    setRemoveClicked(prevNo => prevNo + 1)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    //update cart everytime remove and add to cart button is clicked
    useEffect(() => {
        props.getCart()
    }, [removeClicked, context.addToCart])

    let price = props.data.price.toFixed(2)     //format price to have two decimals

    return (
        <div className="my-4">
            <div className="flex justify-between">
                <div className="flex">
                    <div className="flex items-center mr-2">
                        <p className="text-white text-2xl">{props.data.quantity}x</p>
                    </div>
                    <div className="flex">
                        <div className="w-24">
                            <img className="w-10/12" src={props.data.image} alt='console-{props.data.name}' />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div>
                                <p className="text-white text-2xl">{props.data.brand} {props.data.name}</p>
                            </div>
                            <div>
                                <p className="text-white text-2xl font-sans">RM {price}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center ml-7">
                    <div>
                        <button className="bg-slate-700 hover:bg-slate-500 text-white active:bg-slate-300 text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            type="button"
                            onClick={removeItem}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}