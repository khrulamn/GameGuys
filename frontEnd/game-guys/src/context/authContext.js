import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => { },
	onLogin: () => { },
	addedToCart: () => {},
	addToCart: 0,
	totalPrice: 0,
	setTotalPrice : () => {},
	clientSecret: "",
	newClientSecret: () => {}
})

export const AuthContextProvider = (props) => {
	const [isLoggedin, setIsLoggedin] = useState(false)
	const [addToCart, setAddToCart] = useState(false)
	const [totalPrice, setTotalPrice] = useState(0)
	const [clientSecret, setClientSecret] = useState("")

	useEffect(() => {
		const sessionStorageLoggedIn = sessionStorage.getItem("isLoggedIn")
		if (sessionStorageLoggedIn === '1') {
			setIsLoggedin(true)
		}
	}, [])

	const addedToCart = () => {
		setAddToCart((prev) => prev + 1)
	}

	const logoutHandler = () => {
		setIsLoggedin(false)
		sessionStorage.removeItem("isLoggedIn")
		sessionStorage.removeItem("token")
	}
	const loginHandler = () => {
		setIsLoggedin(true)
		sessionStorage.setItem("isLoggedIn", '1')
	}

	const newTotalPrice = (price) => {
		setTotalPrice(price)
	}

	const newClientSecret = (newCS) => {
		setClientSecret(newCS)
	}

	return (
		<AuthContext.Provider value={{
			isLoggedIn: isLoggedin,
			onLogout: logoutHandler,
			onLogin: loginHandler,
			addedToCart: addedToCart,
			addToCart: addToCart,
			totalPrice: totalPrice,
			setTotalPrice: newTotalPrice,
			clientSecret: clientSecret,
			newClientSecret: newClientSecret
		}}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContext;