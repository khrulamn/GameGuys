import { useContext, useState } from 'react'
import axios from 'axios'
// import SuccessfulLogIn from './SuccessfulLogIn'
import authContext from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

export default function LogInModal(props) {
    const navigate = useNavigate()
    const context = useContext(authContext)
    const [isLogin, setIsLogin] = useState(true)
    const [user, setUser] = useState({
        email: "",
        username: "",
        usernameSignUp: "",
        password: "",
        passwordSignUp: "",
        confirmPassword: "",
    })

    const inputEdited = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const toSignUp = () => {
        setIsLogin(!isLogin)
        setUser({
            email: "",
            username: "",
            usernameSignUp: "",
            password: "",
            passwordSignUp: "",
            confirmPassword: "",
        })
    }

    function signUp() {
        const data = JSON.stringify({
            "email": user.email,
            "username": user.usernameSignUp,
            "password": user.passwordSignUp
        });

        const config = {
            method: 'post',
            url: 'http://localhost:4444/signup',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    logIn(user.usernameSignUp, user.passwordSignUp)
                }
            })
            .then(() => {
                navigate('/input-address')
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function logIn(userName, passWord) {
        var data = JSON.stringify({
            "username": userName,
            "password": passWord
        });

        var config = {
            method: 'post',
            url: 'http://localhost:4444/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                let data = response.data
                // console.log(JSON.stringify(response.data));
                props.setAvatar(data.avatar)
                sessionStorage.setItem("token", data.token)
                sessionStorage.setItem("avatar", data.avatar)
                context.onLogin()
                props.clickHandler()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    if (props.appear && isLogin) {
        return (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animatedDiv"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primaryColor outline-none focus:outline-none px-12 py-7">
                            <div className="absolute right-5 top-5">
                                <button onClick={props.clickHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-white h-6 w-6 hover:stroke-tertiaryColor ease-linear transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {/*header*/}
                            <div className="flex justify-center p-5 border-b border-solid border-slate-500 rounded-t mb-7
                            ">
                                <h3 className="text-3xl font-semibold text-white">
                                    Log in
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>

                                    <label htmlFor='usernameLogin' className="sr-only">
                                        Username
                                    </label>
                                    <input onChange={inputEdited} name="username" type="text" required placeholder="Username" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm" />
                                </div>
                                <div className="pt-4 pb-10">
                                    <label htmlFor='passwordLogin' className="sr-only">
                                        Password
                                    </label>
                                    <input onChange={inputEdited} name="password" type="text" required placeholder="Password" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-red-500
                  focus:border-red-500 focus:z-10 sm:text-sm" />
                                </div>
                            </div>
                            {/*footer*/}
                            <div>
                                <button className="text-white hover:underline" onClick={toSignUp}>Don't have an account? Sign up here.</button>
                            </div>
                            <div className="flex items-center justify-center p-6">
                                <button
                                    className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400"
                                    type="button"
                                    onClick={() => logIn(user.username, user.password)}
                                    disabled={!(user.username && user.password)}
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
        )
    }
    else if (props.appear && !isLogin) {
        return (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animatedDiv"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primaryColor outline-none focus:outline-none px-12 py-7">
                            {/*header*/}
                            <div className="absolute right-5 top-5">
                                <button onClick={props.clickHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-white h-6 w-6 hover:stroke-tertiaryColor ease-linear transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex justify-center p-5 border-b border-solid border-slate-500 rounded-t mb-7
                            ">
                                <h3 className="text-3xl font-semibold text-white">
                                    Sign Up
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor='email' className="sr-only">
                                        Email
                                    </label>
                                    <input onChange={inputEdited} name="email" type="text" required placeholder="Email" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm" />
                                </div>
                                <div className="pt-4">
                                    <label htmlFor='usernameSignup' className="sr-only">
                                        Username
                                    </label>
                                    <input onChange={inputEdited} name="usernameSignUp" type="text" required placeholder="Username" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm" />
                                </div>
                                <div className="pt-4">
                                    <label htmlFor='passwordSignup' className="sr-only">
                                        Password
                                    </label>
                                    <input onChange={inputEdited} name="passwordSignUp" type="text" required placeholder="Password" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-red-500
                  focus:border-red-500 focus:z-10 sm:text-sm" />
                                </div>
                                <div className="pt-4 pb-10">
                                    <label htmlFor='confirmPassword' className="sr-only">
                                        Confirm Password
                                    </label>
                                    <input onChange={inputEdited} name="confirmPassword" type="text" required placeholder="Confirm Password" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-red-500
                  focus:border-red-500 focus:z-10 sm:text-sm" />
                                </div>
                            </div>
                            {/*footer*/}
                            <div>
                                <button className="text-white hover:underline" onClick={toSignUp}>Already have an account? Log in here.</button>
                            </div>
                            <div className="flex items-center justify-center p-6">
                                <button
                                    className="bg-tertiaryColor hover:bg-[#f58284] text-white active:bg-[#f04d50] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 disabled:bg-slate-400"
                                    type="button"
                                    onClick={signUp}
                                    disabled={!(user.usernameSignUp && user.email && user.confirmPassword && user.passwordSignUp)}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
        )
    }
    else {
        return (null)
    }
}