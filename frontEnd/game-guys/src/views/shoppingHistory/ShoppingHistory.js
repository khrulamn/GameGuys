import axios from 'axios'
import { useEffect, useState } from 'react';
import BoughtItems from '../../components/boughtItems/BoughtItems';

export default function ShoppingHistory () {

    const [gameItems, setGameItems] = useState([])
    const [consoleItems, setConsoleItems] = useState([])

    useEffect(() => {
        const getPurchaseHistory = () => {
            const token = sessionStorage.getItem("token");
            const config = {
                method: 'get',
                url: 'http://localhost:4444/user-purchases',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(config)
                .then(function (response) {
                    let gameArray = []
                    let consoleArray = []
                    let result = response.data.result
                    result.forEach((item) => {
                        gameArray.push(...item.game_items)
                    })
                    result.forEach((item) => {
                        consoleArray.push(...item.console_items)
                    })
                    console.log('games', gameArray)
                    console.log('console', consoleArray)
                    setGameItems(gameArray)
                    setConsoleItems(consoleArray)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getPurchaseHistory()
    }, [])

    return(
        <div className="w-[100vw] h-[calc(100vh-160px)] bg-secondaryColor font-main">
            <div className="grid justify-center items-center">
                <div className='m-5 text-center'>
                    <h2 className="text-white text-3xl font-semibold">Purchased Items</h2>
                </div>
                <div>
                    {gameItems.length !== 0 &&
                        gameItems.map((data, index) => <BoughtItems key={index} data={data} type={'game'} />)
                    }
                    {consoleItems.length !== 0 &&
                        consoleItems.map((data, index) => <BoughtItems key={index} data={data} type={'console'}/>)
                    }
                </div>
                <div className="flex items-center justify-center p-6">
                    <button
                        className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400"
                        type="button"
                        onClick={() => {}}
                    >
                        Back to home
                    </button>
                </div>
            </div>
        </div>
    )
}