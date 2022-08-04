export default function SuccessfulLogIn (props) {

    // function closePopUp(){
    //     props.close(false)
    // }

    return (
        <>
                <div
                    className="flex justify-end fixed inset-0 z-50 outline-none focus:outline-none animatedDiv"
                >
                    <div className=" w-auto max-w-3xl" onClick={() => props.close()}>
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg w-full bg-green-600 outline-none focus:outline-none px-3 py-3" >
                            {/*header*/}
                            <div className="flex justify-center p-5 rounded-t
                            ">
                                <h3 className="text-lg font-semibold text-white">
                                    Succesfully logged in! 
                                </h3>
                            </div>
                            {/*body*/}
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black" onClick={() => props.close()}></div>
            </>
        )
}