import { useContext, useEffect, useState } from 'react'
import logo from '../../../assets/images/GameGuys-logo.png'
import LogInModal from '../../modals/LogInModal'
import authContext from '../../../context/authContext'
import SuccessfulLogIn from '../../modals/SuccessfulLogIn'
import CartModal from '../../modals/CartModal'
import OptionModal from '../../modals/OptionModal'
import { useNavigate } from 'react-router-dom'
import ReactTooltip from 'react-tooltip';

export default function NavBar(props) {
    const [avatar, setAvatar] = useState('https://www.pngitem.com/pimgs/m/421-4213053_default-avatar-icon-hd-png-download.png')
    const [showLoginSuccess, setShowLoginSuccess] = useState(false)

    const context = useContext(authContext)
    const navigate= useNavigate()

    //For every refresh, check if user logged in
    useEffect(() => {
        let avatar = sessionStorage.getItem("avatar")
        if (context.isLoggedIn) {
            setShowLoginSuccess(true)
            setAvatar(avatar)
        }
    }, [context.isLoggedIn])

    //for every change, react tooltip rebuild to reflect change
    useEffect(() => {
        ReactTooltip.rebuild();
    }, [context.isLoggedIn])

    function closeLoginSuccess() {
        setShowLoginSuccess(false)
    }

    function goToHome () {
        navigate('/')
    }

    function cartClickHandler () {
        if (context.isLoggedIn){
            props.cartHandler()
        }
        else {
            return
        }
    }

    return (
        <>
            <nav className="flex justify-between bg-primaryColor h-40 w-full border-b border-solid border-slate-500">
                {/* LOGO */}
                <div className="w-2/3 flex items-center">
                    <img className='ml-16 h-4/5' src={logo} alt="GameGuys logo" />
                    <h1 className='text-white text-5xl font-medium hover:text-tertiaryColor hover:cursor-pointer ease-linear transition-all duration-200'><a href="/">GameGuys</a></h1>
                </div>
                <div className='flex justify-between items-center w-1/3'>
                    <div className=' w-4/5'>
                        <ul className='grid grid-cols-2 text-white font-main items-center font-medium text-2xl ml-28 mt-6'>
                            {/* HOME */}
                            <li>
                                <button data-tip="Home" className="hover:cursor-pointer hover:text-tertiaryColor ease-linear transition-all duration-200" onClick={goToHome}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </button>

                                {/* <a className="hover:cursor-pointer hover:text-tertiaryColor ease-linear transition-all duration-200" href={url} >Search</a> */}
                            </li>
                            {/* CART */}
                            <li>    
                                <button data-tip={context.isLoggedIn ? "View cart" : "Login to view cart"} className="hover:cursor-pointer hover:text-tertiaryColor ease-linear transition-all duration-200" onClick={cartClickHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* AVATAR */}
                    <div className='flex items-center justify-center'>
                        <button data-tip={context.isLoggedIn ? "Options" : "Login / Signup"} className='mr-16 rounded-full w-20 h-20' onClick={() => props.clickHandler()}>
                            <img className='rounded-full h-4/5' src={avatar} alt="avatar" />
                        </button>
                    </div>
                </div>

            </nav>
            <ReactTooltip />

            <CartModal cartHandler={props.cartHandler} cartAppear={props.cartAppear}
                totalPrice={props.totalPrice} setTotalPrice={props.setTotalPrice}
                clientSecret={props.clientSecret} setClientSecret={props.setClientSecret} />
            <LogInModal clickHandler={props.clickHandler} appear={props.appear} setAvatar={setAvatar} />
            <OptionModal optionAppear={props.optionAppear} clickHandler={props.clickHandler} setAvatar={setAvatar} />
            {showLoginSuccess && <SuccessfulLogIn close={closeLoginSuccess} />}
        </>
    )
}