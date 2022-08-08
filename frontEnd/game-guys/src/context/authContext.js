import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => { },
	onLogin: () => { },
	addedToCart: () => {},
	addToCart:false
})

export const AuthContextProvider = (props) => {
	const [isLoggedin, setIsLoggedin] = useState(false)
	const [addToCart, setAddToCart] = useState(false)

	useEffect(() => {
		const sessionStorageLoggedIn = sessionStorage.getItem("isLoggedIn")
		if (sessionStorageLoggedIn === '1') {
			setIsLoggedin(true)
		}
	}, [])

	const addedToCart = () => {
		setAddToCart(!addToCart)
		setTimeout(() => {
			setAddToCart(!addToCart)
		}, 2000)
	}

	const logoutHandler = () => {
		setIsLoggedin(false)
		sessionStorage.removeItem("isLoggedIn")
	}
	const loginHandler = () => {
		setIsLoggedin(true)
		sessionStorage.setItem("isLoggedIn", '1')
	}

	return (
		<AuthContext.Provider value={{
			isLoggedIn: isLoggedin,
			onLogout: logoutHandler,
			onLogin: loginHandler,
			addedToCart: addedToCart,
			addToCart: addToCart
		}}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContext;