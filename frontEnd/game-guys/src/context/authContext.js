import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: () => {},
})

export const AuthContextProvider = (props) => {
	const [isLoggedin, setIsLoggedin] = useState(false)

	useEffect (() => {
		const sessionStorageLoggedIn = localStorage.getItem("isLoggedIn")
		if (sessionStorageLoggedIn === '1'){
			setIsLoggedin(true)
		}
	}, [])

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

		}}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContext;