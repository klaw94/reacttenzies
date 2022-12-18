import React, { useState } from "react";
import {nanoid} from "nanoid"
 

export default function Die(props){
    const dot = (<span className="dot"></span>)
    const visualDots = new Array
    for (let i = 0; i < props.number; i++){
        visualDots.push(dot)
    }

    return(
        <div className={"die number" + props.number} 
            id={props.id} 
            style={props.clicked ? {backgroundColor : "#59E391"} : {backgroundColor : "white"} } 
            onClick={() => props.handleClick(props.id)}>{visualDots}
        </div>
    )
}