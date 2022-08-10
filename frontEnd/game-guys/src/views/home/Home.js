import InStock from "../../components/inStock/InStock";

export default function Home() {


    return (
        <div className="bg-secondaryColor min-h-[calc(100vh-160px] font-main flex flex-col">
            <div className="w-90vw flex justify-center relative">
                <div className="">
                    <img
                        className="w-[100vw] h-[45vh] object-cover"
                        src={"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
                        alt="banner" />
                </div>
            </div>
            <div>
                <InStock console={true} game={false} />
                <InStock console={false} game={true} />
            </div>
        </div>
    )
}