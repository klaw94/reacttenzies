import React, { useState } from "react";

export default function Die(props){
    return(
        <div className="die" 
            id={props.id} 
            style={props.clicked ? {backgroundColor : "#59E391"} : {backgroundColor : "white"} } 
            onClick={() => props.handleClick(props.id)}>{props.number}
        </div>
    )
}