import React from "react";  
import "./index.css";
import Card from "./Card";

function Board(){
    return(
        <div className="content">
            <div className="main-board">
                <Card/>
            </div>            
        </div>
    )
        
}

export default Board;