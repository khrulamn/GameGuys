import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/authContext"
// import SuccessfulLogout from "./SuccessfulLogout"

export default function OptionModal(props) {

    const context = useContext(AuthContext)
    const navigate = useNavigate()
    // const [showLogoutMsg, setShowLogoutMsg] = useState(false)

    // console.log('logout?',showLogoutMsg)

    // const logoutMsgShow = () => {
    //     setShowLogoutMsg(!showLogoutMsg)
    // }

    const logOut = () => {
        context.onLogout()
        props.setAvatar('https://www.pngitem.com/pimgs/m/421-4213053_default-avatar-icon-hd-png-download.png')
        props.clickHandler()
        // logoutMsgShow()
    }

    const toPurchaseHistory = () => {
        navigate('/shopping-history')
        props.clickHandler()
    }

    const toInputAddress = () => {
        navigate('/input-address')
        props.clickHandler()
    }

    if (props.optionAppear) {
        return (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animatedDiv"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl font-main">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primaryColor outline-none focus:outline-none px-12 py-7">
                            <div className="absolute right-5 top-5">
                                <button onClick={() => props.clickHandler()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-white h-6 w-6 hover:stroke-tertiaryColor ease-linear transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {/*header*/}
                            <div className="flex justify-center p-5 border-b border-solid border-slate-500 rounded-t mb-7
                                ">
                                <h3 className="text-3xl font-semibold text-white">
                                    Options
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="flex flex-col items-center justify-center">
                                <div className="p-2">
                                    <button className="text-white font-semibold hover:text-tertiaryColor text-xl"
                                    onClick={toPurchaseHistory}>
                                        Shopping History
                                        </button>
                                </div>

                                <div className="p-2">
                                    <button className="text-white font-semibold hover:text-tertiaryColor text-xl"
                                    onClick={toInputAddress}>
                                        Edit Shipping Address
                                    </button>
                                </div>

                            </div>

                            <div className="flex items-center justify-center p-6">
                                <button
                                    className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400"
                                    type="button"
                                    onClick={logOut}
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                {/* {!showLogoutMsg && <SuccessfulLogout close={logoutMsgShow}/>} */}
            </>
        )
    }
    else {
        return null
    }

}