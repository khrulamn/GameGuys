// import { useState } from "react";
import InStock from "../../components/inStock/InStock";
// import ConsoleModal from "../../components/modals/ConsoleModal";

export default function Home(){
    

    return(
        <div className="bg-secondaryColor min-h-[calc(100vh-10rem)] p-10">
            <InStock console={true} game={false}/>
            <InStock console={false} game={true}/>
        </div>
    )
}