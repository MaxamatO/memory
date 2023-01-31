import React from "react";  
import "./index.css";
import Card from "./Card";
import { useState } from "react";
import populate from "./Redu.js";
import { useEffect } from "react";


function Board(){

    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(populate());
    }, [])
    
    const handleClick = (id) => {
        console.log(id);
    }

    return(
        <div className="content">
            <div className="main-board">
                {cards.map((card) => {
                    return(
                        <Card value={card.value} id={card.id}  />
                    )
                })}
                
            </div>            
        </div>
    )
        
}

export default Board;