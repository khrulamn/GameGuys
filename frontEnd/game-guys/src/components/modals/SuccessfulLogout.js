export default function SuccessfulLogout (props) {

    return (
        <>
                <div
                    className="flex justify-center fixed inset-0 z-50 outline-none focus:outline-none animatedDiv mt-10"
                >
                    <div className=" w-auto max-w-3xl" onClick={() => props.close()}>
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg w-full bg-red-600 outline-none focus:outline-none px-3 py-3" >
                            {/*header*/}
                            <div className="flex justify-center p-5 rounded-t
                            ">
                                <h3 className="text-lg font-semibold text-white">
                                    You've logged out
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