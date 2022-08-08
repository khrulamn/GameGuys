import { useContext, useEffect, useState } from 'react'
import logo from '../../../assets/images/GameGuys-logo.png'
import LogInModal from '../../modals/LogInModal'
import authContext from '../../../context/authContext'
import SuccessfulLogIn from '../../modals/SuccessfulLogIn'
import CartModal from '../../modals/CartModal'

export default function NavBar(props) {
    let url = "" // need to get rid later

    const [avatar, setAvatar] = useState('https://www.pngitem.com/pimgs/m/421-4213053_default-avatar-icon-hd-png-download.png')
    const [showLoginSuccess, setShowLoginSuccess] = useState(false)

    const context = useContext(authContext)

    useEffect(() => {
        let avatar = sessionStorage.getItem("avatar")
        if (context.isLoggedIn) {
            setShowLoginSuccess(true)
            setAvatar(avatar)
        }
    }, [context.isLoggedIn])

    function closeLoginSuccess() {
        setShowLoginSuccess(false)
    }

    return (
        <>
            <nav className="flex justify-between bg-primaryColor h-40 w-full border-b border-solid border-slate-500">
                <div className="w-1/2 flex items-center">
                    <img className='ml-16 h-4/5' src={logo} alt="GameGuys logo" />
                    <h1 className='text-white text-5xl font-medium hover:text-tertiaryColor hover:cursor-pointer ease-linear transition-all duration-200'><a href="/">GameGuys</a></h1>
                </div>
                <div className='flex justify-between items-center w-1/2'>
                    <div className=' w-4/5'>
                        <ul className='grid grid-cols-4 text-white font-main items-center font-medium text-2xl ml-28 mt-6'>
                            <li><a className="hover:cursor-pointer hover:text-tertiaryColor ease-linear transition-all duration-200" href={url}>News</a></li>
                            <li><a className="hover:cursor-pointer hover:text-tertiaryColor ease-linear transition-all duration-200" href={url} >Shop</a></li>
                            <li><a className="hover:cursor-pointer hover:text-tertiaryColor ease-linear transition-all duration-200" href={url} >Search</a></li>
                            <li><button className="hover:cursor-pointer hover:text-tertiaryColor ease-linear transition-all duration-200" onClick={() => props.cartHandler()}>Cart</button></li>
                        </ul>
                    </div>
                    <div className='items-center justify-center'>
                        <button className='mr-16 rounded-full w-20 h-20' onClick={() => props.clickHandler()}>
                            <img className='rounded-full h-4/5' src={avatar} alt="avatar" />
                        </button>
                    </div>
                </div>

            </nav>
            <CartModal cartHandler={props.cartHandler} cartAppear={props.cartAppear} />
            <LogInModal clickHandler={props.clickHandler} appear={props.appear} setAvatar={setAvatar} />
            {showLoginSuccess && <SuccessfulLogIn close={closeLoginSuccess} />}
        </>
    )
}