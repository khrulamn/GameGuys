export default function PaidItems (props) {
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}