import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/layouts/header/NavBar';
import Home from './views/home/Home';
import {setAuthToken} from './helpers/authToken'

function App() {
	const [showLogInModal, setShowLogInModal] = useState(false)
	const showLogInHandler = () => {
        setShowLogInModal(!showLogInModal)
    }

	const [showCartModal, setShowCartModal] = useState(false)
	const showCartHandler = () => {
        setShowCartModal(!showCartModal)
    }

	const token = sessionStorage.getItem("token");
	if (token) {
		setAuthToken(token);
	}

	return (
		<React.Fragment>
			<NavBar appear={showLogInModal} clickHandler={showLogInHandler} cartHandler={showCartHandler} cartAppear={showCartModal}></NavBar>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>}/>
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);
}
export default App;