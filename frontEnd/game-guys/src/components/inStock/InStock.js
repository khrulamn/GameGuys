import axios from 'axios'
import React, { useEffect, useState } from 'react'
import InStockConsole from './InStockConsole';
import InStockGame from './InStockGame';

export default function InStock(props) {

    const [consoleStock, setConsoleStock] = useState([])
    const [gameStock, setGameStock] = useState([])


    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:4444/get-consoles',
        };

        axios(config)
            .then(function (response) {
                const data = response.data.result
                setConsoleStock(data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:4444/get-games',
        };

        axios(config)
            .then(function (response) {
                const data = response.data.result
                setGameStock(data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    if (props.console) {
        return (
            <React.Fragment>
                <div className="">
                    <h1 className="text-3xl text-white font-normal">Consoles</h1>
                    <div className='flex flex-wrap'>
                        {consoleStock.length === 0
                            ? <p>Please wait</p>
                            : consoleStock.map((data, index) => <InStockConsole key={index} data={data} />)}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    if (props.game) {
        return (
            <div className="">
                <h1 className="text-3xl text-white font-normal">Games</h1>
                <div className='flex flex-wrap'>
                    {gameStock.length === 0
                        ? <p>Please wait</p>
                        : gameStock.map((data, index) => <InStockGame key={index} data={data} />)}
                </div>
            </div>
        )
    }

}