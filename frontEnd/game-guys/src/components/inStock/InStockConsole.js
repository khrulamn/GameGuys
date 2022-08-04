import React, { useState } from "react";
import ConsoleModal from "../../components/modals/ConsoleModal";


export default function InStockConsole(props) {
    const [showConsoleModal, setShowConsoleModal] = useState(false)

    const showConsoleHandler = () => {
        setShowConsoleModal(!showConsoleModal)
    }

    const price = props.data.price.toFixed(2)

    return (
        <React.Fragment>
            {showConsoleModal && <ConsoleModal clickHandler={showConsoleHandler} data={props.data}/>}
            <div className="p-11">
                <img className="h-72 w-96 rounded-md" src={props.data.image} alt="random" />
                <p className="text-white">{props.data.brand} {props.data.name}</p>
                <p className="text-white">RM{price}</p>
                <button className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={showConsoleHandler}>Buy</button>
            </div>
        </React.Fragment>

    )
}