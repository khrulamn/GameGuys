import React from "react";
import NavBar from "./header/NavBar";

export default function MainLayout(props) {


    return (
        <React.Fragment>
            <NavBar appear={props.appear} clickHandler={props.clickHandler} cartHandler={props.cartHandler} 
            optionAppear={props.optionAppear}
            cartAppear={props.cartAppear} clientSecret={props.clientSecret} setClientSecret={props.setClientSecret} />{props.children}
        </React.Fragment>
    )
}