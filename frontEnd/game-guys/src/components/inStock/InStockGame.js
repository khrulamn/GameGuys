import { useState } from "react"
import GameModal from "../modals/GameModal"

export default function InStockGame(props) {

    const [showGameModal, setShowGameModal] = useState(false)

    const showGameHandler = () => {
        setShowGameModal(!showGameModal)
    }

    const price = props.data.price.toFixed(2)

    return (
        <>
            {showGameModal && <GameModal clickHandler={showGameHandler} data={props.data} />}
            <div className="m-11">
                <img className="h-72 w-60 rounded-md" src={props.data.image} alt="random" />
                <p className="text-white">{props.data.name}</p>
                <p className="text-white">RM{price}</p>
                <button className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={showGameHandler}>Buy</button>
            </div>
        </>

    )
}