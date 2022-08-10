import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import { setAuthToken } from './helpers/authToken'
import CheckoutPage from './views/checkout/CheckoutPage';
import MainLayout from './components/layouts/MainLayout';
import SuccessfulPayment from './views/successPayment/SuccessfulPayment';
import InputAddress from './views/inputAddress/InputAddress';
import AuthContext from './context/authContext';
import ShoppingHistory from './views/shoppingHistory/ShoppingHistory';
import Review from './views/reviews/Review';
import UserReviews from './views/userReviews/UserReviews';

function App() {
	const [showLogInModal, setShowLogInModal] = useState(false)
	const [showOptionModal, setShowOptionModal] = useState(false)
	const [showCartModal, setShowCartModal] = useState(false)
	const context = useContext(AuthContext)

	const showLogInHandler = () => {
		if (!context.isLoggedIn){
			setShowLogInModal(!showLogInModal)
		} 
		else {
			setShowOptionModal(!showOptionModal)
		}
	}

	const showCartHandler = () => {
		setShowCartModal(!showCartModal)
	}

	const token = sessionStorage.getItem("token");
	if (token) {
		setAuthToken(token);
	}

	return (
		<React.Fragment>
			<BrowserRouter>
				<MainLayout appear={showLogInModal} optionAppear={showOptionModal} clickHandler={showLogInHandler}
				cartHandler={showCartHandler} cartAppear={showCartModal}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/checkout" element={<CheckoutPage />} />
						<Route path="/successful-payment" element={<SuccessfulPayment/>}/>
						<Route path='/input-address' element={<InputAddress /> } />
						<Route path='/shopping-history' element={<ShoppingHistory/>}/>
						<Route path='/review-item' element={<Review/>}/>
						<Route path='/user-reviews' element={<UserReviews/>}/>
					</Routes>
				</MainLayout>
			</BrowserRouter>
		</React.Fragment>
	);
}
export default App;