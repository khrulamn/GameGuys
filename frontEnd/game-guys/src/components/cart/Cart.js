export default function Cart(props) {

    let price = props.data.price.toFixed(2)
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
                                <p className="text-white text-2xl">RM{price}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center ml-7">
                    <div>
                        <button className="bg-slate-700 hover:bg-slate-500 text-white active:bg-slate-300 text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => { }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}