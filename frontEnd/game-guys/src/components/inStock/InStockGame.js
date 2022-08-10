import { useState } from "react"
import GameModal from "../modals/GameModal"
import ReactTooltip from 'react-tooltip';

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
                <div>
                    <img className={props.data.quantity === 0 ? "h-72 w-96 rounded-md grayscale" : "h-72 w-96 rounded-md"} src={props.data.image} alt="random" />
                    {props.data.quantity === 0 &&
                        <div className="text-black text-5xl font-extrabold absolute top-28 left-10 -rotate-45">
                            Out of stock
                        </div>
                    }
                </div>
                <div className="flex justify-between items-center mt-3">
                    <div>
                        <p className="text-white font-semibold mx-2 mt-2">{props.data.name}</p>
                        <p className="text-white mx-2">RM<span className="font-sans">{price}</span></p>
                    </div>
                    <button data-tip="More info" onClick={showGameHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 stroke-white hover:stroke-tertiaryColor  ease-linear transition-all duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </button>
                </div>
            </div>
            <ReactTooltip />
        </>

    )
}

{/* <button className=" bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" onClick={showGameHandler}>Buy</button> */ }
