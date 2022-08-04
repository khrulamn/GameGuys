import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// import SuccessfulLogIn from './SuccessfulLogIn'
import authContext from '../../context/authContext'

export default function LogInModal(props) {

    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [usernameSignUp, setUsernameSignUp] = useState("")
    const [password, setPassword] = useState("")
    const [passwordSignUp, setPasswordSignUp] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const context = useContext(authContext)

    const emailEdited = (event) => {
        setEmail(event.target.value)
    }

    const usernameEdited = (event) => {
        setUsername(event.target.value)
    }

    const usernameSignUpEdited = (event) => {
        setUsernameSignUp(event.target.value)
    }

    const passwordEdited = (event) => {
        setPassword(event.target.value)
    }

    const passwordSignUpEdited = (event) => {
        setPasswordSignUp(event.target.value)
    }

    const confirmPasswordEdited = (event) => {
        setConfirmPassword(event.target.value)
    }


    const toSignUp = () => {
        setIsLogin(!isLogin)
        setUsername("")
        setUsernameSignUp("")
        setEmail("")
        setPassword("")
        setPasswordSignUp("")
        setConfirmPassword("")
    }

    

    // const signUpBtnDisable = () => {
    //     if(password !== ""){
    //         if(password === confirmPassword){
    //             return false
    //         } else return true
    //     } else {
    //         return true
    //     }
    // }


    function signUp() {
        var data = JSON.stringify({
            "email": email,
            "username": usernameSignUp,
            "password": passwordSignUp
        });

        var config = {
            method: 'post',
            url: 'http://localhost:4444/signup',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.data.error){
                    console.log(response.data.error)
                } else {
                    logIn(usernameSignUp, passwordSignUp)
                }
            })
            .catch(function (error) {
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
                                    <input onChange={usernameEdited} type="text" required placeholder="Username" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm" />
                                </div>
                                <div className="pt-4 pb-10">
                                    <label htmlFor='passwordLogin' className="sr-only">
                                        Password
                                    </label>
                                    <input onChange={passwordEdited} type="text" required placeholder="Password" className=" relative block
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
                                    onClick={() => logIn(username, password)}
                                    disabled={!(username && password)}
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
                                    <input onChange={emailEdited} type="text" required placeholder="Email" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm" />
                                </div>
                                <div className="pt-4">
                                    <label htmlFor='usernameSignup' className="sr-only">
                                        Username
                                    </label>
                                    <input onChange={usernameSignUpEdited} type="text" required placeholder="Username" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-tertiaryColor
                  focus:border-tertiaryColor focus:z-10 sm:text-sm" />
                                </div>
                                <div className="pt-4">
                                    <label htmlFor='passwordSignup' className="sr-only">
                                        Password
                                    </label>
                                    <input onChange={passwordSignUpEdited} type="text" required placeholder="Password" className=" relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-md
                  focus:outline-none focus:ring-red-500
                  focus:border-red-500 focus:z-10 sm:text-sm" />
                                </div>
                                <div className="pt-4 pb-10">
                                    <label htmlFor='confirmPassword' className="sr-only">
                                        Confirm Password
                                    </label>
                                    <input onChange={confirmPasswordEdited} type="text" required placeholder="Confirm Password" className=" relative block
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
                                    disabled={!(usernameSignUp && email && confirmPassword && passwordSignUp)}
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