import React, { createRef, useEffect, useRef, useState } from "react"
import styled from "styled-components";
import populate from "./Redu.js";

function Card() {
    const [cards, setCards] = useState([]);
    const cardRef = useRef([]);
    const countClicksRef = useRef(0);
    const cardsClickedRef = useRef([]);
    const cardsGuessed = useRef([])

    useEffect(() => {
        // eslint-disable-next-line
        setCards(populate());
        }, []);

    function show(id, div){
        div.firstChild.className="show";
        countClicksRef.current = countClicksRef.current+1;
        cardsClickedRef.current.push(id);
        
    }
    function hide(ids){
        let divs = cardRef.current;
        let card1 = cards.find((card) => card.id===ids[0]);
        let card2 = cards.find((card) => card.id===ids[1]);
        if(check(card1, card2)){
            cardsGuessed.current.push(card1.id, card2.id)
            disable(card1.id, card2.id);
        }  
        else{
            for(let i=0; i<divs.length; i++){
                let divToWorkWith = divs[i].firstChild;
                    if(divs[i].id===ids[0] && !cardsGuessed.current.includes(divs[i].id)){
                        divToWorkWith.className = "hidden";
                    }
                    if(divs[i].id===ids[1] && !cardsGuessed.current.includes(divs[i].id)){
                        divToWorkWith.className = "hidden";
                    }
                }
        }
        countClicksRef.current = 0;
        cardsClickedRef.current = [];
    }

    function check(card1, card2){
        console.log(card1.value, card2.value);
        if(card1.value === card2.value && !cardsGuessed.current.includes(card1.id) && !cardsGuessed.current.includes(card2.id)){
            return true;
        }
        return false;
    }

    function disable(id1, id2){
        let divs = cardRef.current;
        for(let i=0; i<divs.length; i++){
            let divToWorkWith = divs[i];
                if(divs[i].id===id1){
                    divToWorkWith.classList.add("disabled");
                }
                if(divs[i].id===id2){
                    divToWorkWith.classList.add("disabled");
                }
            }
    }

    function handleClick(id){
        if(countClicksRef.current === 2)return;
        let divs = cardRef.current;
        for(let i=0; i<divs.length; i++){
            if(divs[i].id===id && !cardsClickedRef.current.includes(id) && !cardsGuessed.current.includes(cards.find((card) => card.id===id).id)){                
                show(id, divs[i]);
            }
        }
        if(countClicksRef.current===2){
            setTimeout(()=>{
                hide(cardsClickedRef.current);
            }, 500)
        }
    }

    return(
        <>
            {cards.map((card, i) => {
                return(
                    <MemoryCard key={card.id} id={card.id} ref={(ref) => (cardRef.current[i] = ref)} onClick={()=>handleClick(card.id)}>
                            <p className="hidden">{card.value}</p>
                        </MemoryCard>
                    
                )
            })}
        </>
    )
}

const MemoryCard = styled.button`
    background-color: #A99985;
    text-align: center;
    width: 100%;
    height: 100%;
    border: none;

    :hover{
        background-color: #999999;
        cursor: pointer;
    }
    .hidden{
        opacity: 0;
    }
    .show{
        opacity: 100;
    }
    p{
        font-size: 30px;
        margin-top: 50%;
    }
    .disabled{
        
            background-color: #70798C;
        
    }
`

export default Card;